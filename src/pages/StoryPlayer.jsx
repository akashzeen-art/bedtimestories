import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { STORIES } from '../data/stories';
import { ALL_BOOKS, FEATURED_BOOKS } from '../data/books';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_KEY;

const ALL = Array.from(
  new Map([...FEATURED_BOOKS, ...ALL_BOOKS].map(b => [b.id, b])).values()
);

export default function StoryPlayer() {
  const { id } = useParams();
  const storyData = STORIES[Number(id)];
  const bookMeta  = ALL.find(b => String(b.id) === id) || { title: 'Story', category: '', time: 0 };

  const title     = storyData?.title    || bookMeta.title;
  const category  = storyData?.category || bookMeta.category;
  const time      = storyData?.time     || bookMeta.time;
  const storyText = storyData?.story    || 'Sorry, this story is not available yet.';

  // Split story into paragraphs for display
  const paragraphs = storyText.split('\n\n').filter(p => p.trim());

  // ── speech state ──
  const [started,      setStarted]      = useState(false);
  const [speaking,     setSpeaking]     = useState(false);
  const [paused,       setPaused]       = useState(false);
  const [done,         setDone]         = useState(false);
  const [currentPara,  setCurrentPara]  = useState(-1);
  const paraRefs      = useRef([]);
  const utterRefs     = useRef([]);
  const currentParaRef = useRef(-1);  // always in sync for use inside callbacks
  const pausedRef      = useRef(false);

  // ── chat state ──
  const [messages, setMessages] = useState([]);
  const [input,    setInput]    = useState('');
  const [loading,  setLoading]  = useState(false);
  const bottomRef  = useRef(null);
  const chatRef    = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  // Auto-scroll to current paragraph while reading
  useEffect(() => {
    if (currentPara >= 0 && paraRefs.current[currentPara]) {
      paraRefs.current[currentPara].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentPara]);

  function getBestVoice() {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(v => v.lang.startsWith('en') && /female|woman|samantha|karen|moira|tessa|victoria|zira/i.test(v.name)) ||
      voices.find(v => v.lang.startsWith('en')) ||
      voices[0]
    );
  }

  function speakParagraphs(startIndex = 0) {
    if (startIndex >= paragraphs.length) {
      setSpeaking(false);
      setDone(true);
      currentParaRef.current = -1;
      setCurrentPara(-1);
      setMessages([{
        role: 'assistant',
        content: `I've finished telling you "${title}"! 🌟 Did you enjoy it? Feel free to ask me anything about the story!`,
      }]);
      return;
    }

    currentParaRef.current = startIndex;
    setCurrentPara(startIndex);

    const utter = new SpeechSynthesisUtterance(paragraphs[startIndex]);
    utter.rate   = 0.78;
    utter.pitch  = 1.05;
    utter.volume = 1;

    const voice = getBestVoice();
    if (voice) utter.voice = voice;

    utter.onend = () => {
      // if paused, do not advance — resumeStory() will re-call speakParagraphs
      if (!pausedRef.current) speakParagraphs(startIndex + 1);
    };
    utter.onerror = (e) => {
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      if (!pausedRef.current) speakParagraphs(startIndex + 1);
    };

    utterRefs.current[startIndex] = utter;
    window.speechSynthesis.speak(utter);
  }

  function startStory() {
    window.speechSynthesis.cancel();
    pausedRef.current = false;
    currentParaRef.current = -1;
    setStarted(true);
    setSpeaking(true);
    setPaused(false);
    setDone(false);
    setCurrentPara(-1);
    setMessages([]);

    const trySpeak = () => speakParagraphs(0);
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = trySpeak;
    } else {
      trySpeak();
    }
  }

  function pauseStory() {
    pausedRef.current = true;
    setPaused(true);
    window.speechSynthesis.cancel(); // cancel current utterance cleanly
  }

  function resumeStory() {
    pausedRef.current = false;
    setPaused(false);
    // re-speak from the paragraph we paused on
    speakParagraphs(currentParaRef.current >= 0 ? currentParaRef.current : 0);
  }

  function stopStory() {
    pausedRef.current = false;
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
    setDone(true);
    currentParaRef.current = -1;
    setCurrentPara(-1);
    setMessages([{
      role: 'assistant',
      content: `Story stopped. You can ask me anything about "${title}"! 😊`,
    }]);
  }

  // ── OpenAI Q&A ──
  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg    = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const systemMsg = {
      role: 'system',
      content: `You are a warm, friendly bedtime story narrator for children.
The story is "${title}" (${category}, ${time} minutes).
Full story:\n\n${storyText}\n\n
Answer only based on this story. Keep answers short, friendly, and simple for children.`,
    };

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [systemMsg, ...newMessages],
          temperature: 0.7,
        }),
      });
      if (!res.ok) throw new Error(res.status);
      const data  = await res.json();
      const reply = data.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      // speak the answer
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(reply);
      utter.rate  = 0.95;
      utter.pitch = 1.05;
      const voice = getBestVoice();
      if (voice) utter.voice = voice;
      window.speechSynthesis.speak(utter);

    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '⚠️ Could not answer right now. Please try again!',
      }]);
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />

      {/* Starry background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        backgroundColor: '#0A064C',
        backgroundImage: "url('https://uk.bedtimestories.world/bedtime/images/small_stars.png')",
      }} />

      <div style={{ position: 'relative', zIndex: 5, paddingTop: 90, minHeight: '100vh', paddingBottom: 100 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 15px' }}>

          {/* ── Header ── */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: '#F5927D', lineHeight: 1.2 }}>{title}</div>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ background: '#5330ac', borderRadius: 100, padding: '4px 16px', fontSize: 13, color: '#BCB9E1', fontWeight: 600 }}>{category}</span>
              <span style={{ background: '#471fab', borderRadius: 100, padding: '4px 16px', fontSize: 13, color: '#BCB9E1', fontWeight: 600 }}>{time} Min</span>
            </div>
          </div>

          {/* ── Start screen ── */}
          {!started && (
            <div style={{
              background: '#201360', borderRadius: 16, padding: '60px 20px',
              textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>📖</div>
              <div style={{ color: '#BCB9E1', fontSize: 16, marginBottom: 8 }}>Ready to read and listen to</div>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 32 }}>{title}</div>
              <button onClick={startStory} style={btnStyle('gradient')}>▶&nbsp; Start Story</button>
            </div>
          )}

          {/* ── Story + controls ── */}
          {started && (
            <div style={{ background: '#201360', borderRadius: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', overflow: 'hidden' }}>

              {/* Controls bar */}
              <div style={{
                padding: '16px 20px', background: '#1a0a55',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
              }}>
                {/* Sound bars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {speaking && !paused && (
                    <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 24 }}>
                      {[0,1,2,3,4].map(i => (
                        <div key={i} style={{
                          width: 4, borderRadius: 4,
                          background: 'linear-gradient(#e89fff, #ba7bfe)',
                          animation: 'bar 0.9s ease-in-out infinite alternate',
                          animationDelay: `${i * 0.15}s`,
                        }} />
                      ))}
                    </div>
                  )}
                  <span style={{ color: '#BCB9E1', fontSize: 13 }}>
                    {done ? '✅ Finished!' : paused ? '⏸ Paused' : speaking ? '🔊 Reading aloud...' : ''}
                  </span>
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {!done && (
                    <>
                      <button onClick={paused ? resumeStory : pauseStory} style={btnStyle('purple')}>
                        {paused ? '▶ Resume' : '⏸ Pause'}
                      </button>
                      <button onClick={stopStory} style={btnStyle('dark')}>⏹ Stop</button>
                    </>
                  )}
                  {done && (
                    <button onClick={startStory} style={btnStyle('gradient')}>🔄 Listen Again</button>
                  )}
                </div>
              </div>

              {/* ── Story text ── */}
              <div style={{
                padding: '28px 28px', maxHeight: '55vh', overflowY: 'auto',
                borderBottom: done ? '1px solid rgba(188,185,225,0.15)' : 'none',
              }}>
                {paragraphs.map((para, i) => (
                  <p
                    key={i}
                    ref={el => paraRefs.current[i] = el}
                    style={{
                      color: currentPara === i ? '#ffffff' : 'rgba(188,185,225,0.75)',
                      fontSize: 16,
                      lineHeight: 1.9,
                      marginBottom: 20,
                      padding: currentPara === i ? '10px 14px' : '0',
                      borderRadius: 8,
                      background: currentPara === i ? 'rgba(83,48,172,0.45)' : 'transparent',
                      borderLeft: currentPara === i ? '3px solid #e89fff' : '3px solid transparent',
                      transition: 'all 0.4s ease',
                      fontWeight: currentPara === i ? 600 : 400,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* ── Q&A section (shown after done) ── */}
              {done && (
                <>
                  <div style={{
                    maxHeight: '35vh', overflowY: 'auto',
                    padding: '20px 20px 10px',
                    display: 'flex', flexDirection: 'column', gap: 14,
                  }}>
                    {messages.map((m, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        {m.role === 'assistant' && (
                          <div style={{
                            width: 30, height: 30, borderRadius: '50%', background: '#5330ac',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 14, flexShrink: 0, marginRight: 8, marginTop: 2,
                          }}>📖</div>
                        )}
                        <div style={{
                          maxWidth: '78%', padding: '10px 14px', borderRadius: 14,
                          background: m.role === 'user' ? '#463986' : '#471fab',
                          color: '#fff', fontSize: 14, lineHeight: 1.6,
                          borderBottomRightRadius: m.role === 'user' ? 4 : 14,
                          borderBottomLeftRadius:  m.role === 'assistant' ? 4 : 14,
                          whiteSpace: 'pre-wrap',
                        }}>
                          {m.content}
                        </div>
                      </div>
                    ))}

                    {loading && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: '50%', background: '#5330ac',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
                        }}>📖</div>
                        <div style={{
                          background: '#471fab', borderRadius: 14, borderBottomLeftRadius: 4,
                          padding: '10px 16px', display: 'flex', gap: 5, alignItems: 'center',
                        }}>
                          {[0,1,2].map(i => (
                            <div key={i} style={{
                              width: 7, height: 7, borderRadius: '50%', background: '#BCB9E1',
                              animation: 'bounce 1.2s infinite',
                              animationDelay: `${i * 0.2}s`,
                            }} />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Input */}
                  <form onSubmit={sendMessage} style={{
                    borderTop: '1px solid rgba(188,185,225,0.15)',
                    padding: '12px 16px', display: 'flex', gap: 10,
                    background: '#1a0a55',
                  }}>
                    <input
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Ask something about the story..."
                      disabled={loading}
                      style={{
                        flex: 1, background: '#5330AC', border: 'none', borderRadius: 100,
                        padding: '10px 18px', color: '#BCB9E1', fontSize: 14,
                        fontFamily: 'Montserrat, sans-serif', fontWeight: 500, outline: 'none',
                      }}
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      style={{
                        ...btnStyle('gradient'),
                        opacity: loading || !input.trim() ? 0.4 : 1,
                        cursor:  loading || !input.trim() ? 'default' : 'pointer',
                      }}
                    >Send</button>
                  </form>
                </>
              )}

            </div>
          )}

        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1);   opacity: 1;   }
        }
        @keyframes bar {
          from { height: 6px;  }
          to   { height: 28px; }
        }
      `}</style>
    </>
  );
}

function btnStyle(variant) {
  const base = {
    border: 'none', borderRadius: 100, padding: '10px 24px',
    color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
    fontFamily: 'Montserrat, sans-serif', transition: 'opacity .2s',
  };
  if (variant === 'gradient') return { ...base, background: 'linear-gradient(135deg, #e89fff, #ba7bfe)', boxShadow: '0 4px 15px rgba(186,123,254,0.35)' };
  if (variant === 'purple')   return { ...base, background: '#5330ac' };
  if (variant === 'dark')     return { ...base, background: '#0a064c' };
  return base;
}
