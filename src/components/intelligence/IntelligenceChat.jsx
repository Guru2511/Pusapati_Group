import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, Check, LoaderCircle, MessageSquareText, Sparkles } from "lucide-react";
import { askPusapatiIntelligence } from "@/lib/intelligence-fns";

const languages = {
  en: {
    label: "English",
    greeting: "Hello. What would you like to know about Pusapati Group?",
    placeholder: "Ask about our companies, products or enquiries…",
    send: "Send",
    suggestions: [
      "What does Pusapati Group do?",
      "Which companies are operating?",
      "How can I register as a vendor?",
      "Can BrikBuild help build a home?",
      "How do I request a quote?",
    ],
    errorRateLimit: "Too many questions. Please wait a minute and try again.",
    errorUnavailable: "Pusapati Intelligence is busy right now. Please try again shortly or contact the Group desk.",
    errorTimeout: "That request took too long. Please try a shorter question or contact the Group desk.",
    errorGeneric: "We couldn’t complete that answer. Please try again or contact the Group desk.",
  },
  te: {
    label: "తెలుగు",
    greeting: "నమస్కారం. పుసపతి గ్రూప్ గురించి ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    placeholder: "మా కంపెనీలు, ఉత్పత్తులు లేదా విచారణల గురించి అడగండి…",
    send: "పంపండి",
    suggestions: [
      "పుసపతి గ్రూప్ ఏమి చేస్తుంది?",
      "ప్రస్తుతం ఏ కంపెనీలు పనిచేస్తున్నాయి?",
      "విక్రేతగా ఎలా నమోదు చేసుకోవాలి?",
      "ఇల్లు నిర్మించడంలో బ్రిక్‌బిల్డ్ సహాయపడుతుందా?",
      "కోట్ కోసం ఎలా విచారించాలి?",
    ],
    errorRateLimit: "చాలా ప్రశ్నలు అడిగారు. ఒక నిమిషం వేచి మళ్లీ ప్రయత్నించండి.",
    errorUnavailable: "ప్రస్తుతం పుసపతి ఇంటెలిజెన్స్ అందుబాటులో లేదు. కొద్దిసేపటి తర్వాత ప్రయత్నించండి లేదా గ్రూప్ డెస్క్‌ను సంప్రదించండి.",
    errorTimeout: "ఈ అభ్యర్థనకు ఎక్కువ సమయం పట్టింది. చిన్న ప్రశ్నతో మళ్లీ ప్రయత్నించండి లేదా గ్రూప్ డెస్క్‌ను సంప్రదించండి.",
    errorGeneric: "సమాధానం ఇవ్వలేకపోయాం. మళ్లీ ప్రయత్నించండి లేదా గ్రూప్ డెస్క్‌ను సంప్రదించండి.",
  },
  hi: {
    label: "हिन्दी",
    greeting: "नमस्ते। आप पुसापति ग्रुप के बारे में क्या जानना चाहेंगे?",
    placeholder: "हमारी कंपनियों, उत्पादों या पूछताछ के बारे में पूछें…",
    send: "भेजें",
    suggestions: [
      "पुसापति ग्रुप क्या करता है?",
      "अभी कौन-सी कंपनियां काम कर रही हैं?",
      "विक्रेता के रूप में पंजीकरण कैसे करें?",
      "क्या ब्रिकबिल्ड घर बनाने में मदद कर सकता है?",
      "कोटेशन के लिए कैसे पूछें?",
    ],
    errorRateLimit: "बहुत सारे प्रश्न हो गए हैं। एक मिनट रुककर फिर कोशिश करें।",
    errorUnavailable: "पुसापति इंटेलिजेंस अभी उपलब्ध नहीं है। थोड़ी देर बाद कोशिश करें या ग्रुप डेस्क से संपर्क करें।",
    errorTimeout: "इस अनुरोध में बहुत समय लगा। छोटा प्रश्न पूछें या ग्रुप डेस्क से संपर्क करें।",
    errorGeneric: "अभी उत्तर नहीं मिल पाया। फिर कोशिश करें या ग्रुप डेस्क से संपर्क करें।",
  },
};

export default function IntelligenceChat() {
  const [language, setLanguage] = useState("en");
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const copy = languages[language];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  async function sendQuestion(value) {
    const content = value.trim();
    if (!content || sending) return;
    if (content.length > 1200) {
      setError("Please keep your question under 1,200 characters.");
      return;
    }

    const priorMessages = messages
      .slice(-6)
      .map(({ role, content: messageContent }) => ({ role, content: messageContent.slice(0, 800) }));
    const nextMessages = [...priorMessages, { role: "user", content }];
    setMessages((current) => [...current, { role: "user", content }]);
    setQuestion("");
    setError("");
    setSending(true);

    try {
      const result = await askPusapatiIntelligence({
        data: { language, messages: nextMessages },
        signal: AbortSignal.timeout(20_000),
      });
      setMessages((current) => [...current, { role: "assistant", content: result.answer, sources: result.sources }]);
    } catch (requestError) {
      console.error("[pusapati intelligence] Could not answer the question:", requestError);
      const errorText = requestError?.message || "";
      if (requestError?.status === 429) setError(copy.errorRateLimit);
      else if (requestError?.status === 504 || requestError?.code === "AI_PROVIDER_TIMEOUT" || /timed?\s*out|timeout/i.test(errorText)) {
        setError(copy.errorTimeout);
      } else if (requestError?.status === 503 || requestError?.code === "AI_PROVIDER_UNAVAILABLE" || /temporarily unavailable/i.test(errorText)) {
        setError(copy.errorUnavailable);
      } else {
        setError(copy.errorGeneric);
      }
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-[24px] border border-ink/10 bg-white shadow-lift">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 bg-paper/70 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-orange">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-[14px] font-semibold tracking-tight text-ink">Pusapati Intelligence</h2>
            <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-slate">Website knowledge assistant</p>
          </div>
        </div>
        <label className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-slate">
          Language
          <select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            className="rounded-full border border-ink/15 bg-white px-3 py-2 text-[11px] font-medium normal-case tracking-normal text-ink outline-none focus:border-orange"
            aria-label="Choose assistant language"
          >
            {Object.entries(languages).map(([code, value]) => <option key={code} value={code}>{value.label}</option>)}
          </select>
        </label>
      </div>

      <div className="flex min-h-[430px] flex-col sm:min-h-[500px]">
        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-6 sm:px-7" aria-live="polite">
          {!messages.length && (
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-paper px-4 py-3.5 text-[14px] leading-relaxed text-ink">
              <p>{copy.greeting}</p>
              <p className="mt-2 text-[11px] text-slate">Answers are based on approved public website information.</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-auto max-w-[85%]" : "max-w-[90%]"}>
              <div className={`whitespace-pre-wrap rounded-2xl px-4 py-3.5 text-[14px] leading-relaxed ${
                message.role === "user"
                  ? "rounded-br-sm bg-ink text-paper"
                  : "rounded-tl-sm bg-paper text-ink"
              }`}>
                {message.content}
              </div>
              {message.sources && (
                <div className="mt-2 flex flex-wrap gap-2" aria-label="Reference pages">
                  {message.sources.map((source) => (
                    <Link key={source.path} to={source.path} className="inline-flex items-center gap-1 rounded-full border border-ink/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-slate transition-colors hover:border-orange hover:text-ink">
                      <Check className="h-3 w-3 text-orange" aria-hidden="true" />
                      {source.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {sending && (
            <div className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-3 text-[12px] text-slate">
              <LoaderCircle className="h-4 w-4 animate-spin text-orange" aria-hidden="true" />
              Thinking…
            </div>
          )}
          {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-800">{error}</p>}
          <div ref={bottomRef} />
        </div>

        <form
            onSubmit={(event) => {
              event.preventDefault();
              sendQuestion(question);
            }}
            className="border-t border-ink/10 bg-paper/60 p-4 sm:px-7 sm:py-5"
          >
            {!messages.length && (
              <div className="mb-4 flex flex-wrap gap-2">
                {copy.suggestions.map((suggestion) => (
                  <button key={suggestion} type="button" onClick={() => sendQuestion(suggestion)} disabled={sending} className="rounded-full border border-ink/10 bg-white px-3 py-2 text-left text-[11px] text-ink transition-colors hover:border-orange disabled:opacity-50">
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-end gap-3 rounded-2xl border border-ink/10 bg-white p-2 pl-4 focus-within:border-orange">
              <MessageSquareText className="mb-2 h-4 w-4 shrink-0 text-slate/60" aria-hidden="true" />
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendQuestion(question);
                  }
                }}
                maxLength={1200}
                rows={1}
                placeholder={copy.placeholder}
                aria-label="Your question"
                className="max-h-32 min-h-10 flex-1 resize-y bg-transparent py-2 text-[13px] leading-relaxed text-ink outline-none placeholder:text-slate/55"
                disabled={sending}
              />
              <button type="submit" disabled={!question.trim() || sending} aria-label={copy.send} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-orange text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40">
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 px-1 text-[10px] leading-relaxed text-slate/70">Please don’t share confidential or sensitive personal information.</p>
          </form>
      </div>
    </section>
  );
}
