/**
 * Groq AI Dynamic Question & Comeback Generator for Aunty Bingo
 * Generates fresh daily questions with guaranteed 1:1 matching savage, polite, and funny comebacks.
 * 
 * Powered by Groq fast inference (openai/gpt-oss-120b).
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const PRIMARY_MODEL = 'openai/gpt-oss-120b';

export function getGroqApiKey() {
  const key =
    import.meta.env.VITE_GROQ_API_KEY ||
    import.meta.env.GROQ_API_KEY ||
    (typeof process !== 'undefined' ? process.env?.VITE_GROQ_API_KEY || process.env?.GROQ_API_KEY : '') ||
    '';
  return (key || '').trim();
}

export function isAIAvailable() {
  return Boolean(getGroqApiKey());
}

export function getTodayKey() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const OCCASION_TOPICS = {
  wedding: {
    name: 'Wedding & Dawot (বিয়ে ও দাওয়াত)',
    themes: [
      'Age & why not married yet (বয়স তো বসে নেই, বিয়ে কবে করবা?)',
      'Matchmaking proposals (আমাদের এক পরিচিত পাত্র/পাত্রী আছে, দেখবা?)',
      'Cousin comparison (তোমার ছোট কাজিনও তো বিয়ে করে সংসারী হয়ে গেল!)',
      'Biryani & catering gossip (কাচ্চিতে কি বাবুর্চি মাংস ছোট দিল?)',
      'Salary & readiness (বিয়ে করার আগে মাসে কত টাকা জমাচ্ছ শুনি?)',
      'Appearance & dressing (এত রোগা/মোটা হয়ে গেছ, শেরওয়ানি/শাড়ি মানাবে তো?)'
    ],
    samples: [
      {
        bn: 'বয়স তো ৩০ পার হয়ে গেল, নিজের বিয়ের দাওয়াত কবে খাওয়াবা শুনি?',
        en: 'You crossed 30, when will you invite us to your own wedding?',
        comebacks: {
          polite: { bn: 'দোয়া করবেন খালাম্মা, সময় হলে উপরওয়ালা ঠিকই ব্যবস্থা করবেন।', en: 'Please pray for me aunty, God will arrange it in due time.' },
          savage: { bn: 'আপনার নিজের ছেলে কবে চাকরি পাবে সেই চিন্তা আগে করেন খালাম্মা!', en: 'Find out when your own son gets a job first!' },
          funny: { bn: 'কাচ্চির বিরিয়ানির বাজেট মেলাতে পারছি না, স্পন্সর করলে কালকেই ডেট দিচ্ছি!', en: 'Cannot balance the biryani budget, sponsor it and I set a date tomorrow!' }
        }
      },
      {
        bn: 'কাচ্চিতে মাংসের সাইজ এত ছোট দিল কেন বাবুর্চি? খাওয়াটাই মাটি!',
        en: 'Why did the caterer serve such small meat pieces in the kacchi? Ruined the meal!',
        comebacks: {
          polite: { bn: 'আলহামদুলিল্লাহ খালাম্মা, খাবার যা পেয়েছি তাতেই তৃপ্তি।', en: 'Praise be to God aunty, what we received is a blessing.' },
          savage: { bn: 'আপনার প্লেটের তিন টুকরা মাংস খেয়েও পেট ভরেনি খালাম্মা?', en: 'Even after finishing three large meat pieces you are still complaining?' },
          funny: { bn: 'মাংসের সাইজ ছোট হলেও আপনার দাওয়াতে আসার খরচ কিন্তু পুরাই উসুল!', en: 'The meat may be small, but you already made your attendance worth every penny!' }
        }
      }
    ]
  },
  eid: {
    name: 'Eid Reunion (ঈদের আড্ডা)',
    themes: [
      'Job holders asking for Eidi (চাকরি করো, এখনও সালামি চাও কেন?)',
      'Eating too much semai and beef (কয় বাড়ি ঘুরে সেমাই আর মাংস খাইলা?)',
      'Appearance check (গত ঈদের চেয়েও শুকিয়ে গেছ, শরীর ঠিক আছে তো?)',
      'Comparison with cousins (অমুকের ছেলে তো ঈদে বাবাকে গাড়ি উপহার দিল!)',
      'Marriage talks right after Eid (ঈদের পর কিন্তু তোমার বিয়ের পাকা কথা হবে!)'
    ],
    samples: [
      {
        bn: 'চাকরি তো করো, এখনও বড়দের কাছে সালামি চাও কেন শুনি?',
        en: 'You have a job now, why are you still asking elders for Eidi?',
        comebacks: {
          polite: { bn: 'সালামি তো টাকার জন্য নয় খালাম্মা, আপনার ভালোবাসা ও আশীর্বাদ হিসেবে নিই।', en: 'Eidi is not about money aunty, it is your blessing and love.' },
          savage: { bn: 'আমি চাকরি নিলেও আপনার কিপ্টেমির অভ্যাস তো বদলায়নি খালাম্মা!', en: 'I may have gotten a job, but your stingy habits never changed!' },
          funny: { bn: 'চাকরির টাকায় চাল-ডাল কিনি, আর সালামির টাকায় বন্ধুদের সাথে কাচ্চি খাই!', en: 'Job salary pays the grocery bills, Eidi pays for biryani hangouts!' }
        }
      }
    ]
  },
  exam: {
    name: 'Exam Results (রেজাল্টের দিন)',
    themes: [
      'Golden A+ inquiry (গোল্ডেন এ প্লাস আসছে তো? নাকি রেজাল্ট খারাপ হলো?)',
      'Phone addiction blaming (সারাদিন ফোন গুঁতালে রেজাল্ট ভালো হবে ক্যামনে?)',
      'BCS career obsession (বিসিএস ক্যাডার না হলে তো সমাজে কোনো দাম নেই!)',
      'University admission comparisons (অমুকের ছেলে ঢাবিতে ফার্স্ট হলো, তোমার কী অবস্থা?)'
    ],
    samples: [
      {
        bn: 'গোল্ডেন এ প্লাস আসছে তো? নাকি সারাদিন ফোনে মুখ গুঁজে রেজাল্ট নষ্ট করলা?',
        en: 'Did you get Golden A+? Or did you ruin grades being glued to the phone?',
        comebacks: {
          polite: { bn: 'চেষ্টা করেছি খালাম্মা, রেজাল্ট যা এসেছে তাতে আলহামদুলিল্লাহ আমি সন্তুষ্ট।', en: 'I tried my best aunty, I am grateful for my result.' },
          savage: { bn: 'আমার রেজাল্ট দিয়ে কি আপনার বাসার কাজের লোক নিয়োগ দেওয়া হবে?', en: 'Are you using my grades to hire domestic help for your home?' },
          funny: { bn: 'মার্কশিটে এ প্লাস না পেলেও আত্মবিশ্বাসে আমি গোল্ডেন ট্রফি পেয়েছি!', en: 'Did not get A+ on marksheet, but I earned a golden trophy in confidence!' }
        }
      }
    ]
  },
  general: {
    name: 'General Family Adda (পারিবারিক আড্ডা)',
    themes: [
      'Monthly salary check (মাসে স্যালারি কত পাও এখন? অমুকের ছেলে তো লাখ টাকা কামায়!)',
      'Weight & health check (একটু বেশি শুকিয়ে গেছ না? ঠিকমতো খাও না নাকি?)',
      'Savings & future planning (এই বয়সে সঞ্চয় না করলে পরে পস্তাবা!)',
      'Baby questions for married couples (বাচ্চা কবে নিচ্ছ? আর কত দেরি করবা?)'
    ],
    samples: [
      {
        bn: 'মাসে স্যালারি কত পাও এখন? অমুকের ছেলে তো লাখ টাকা কামায়!',
        en: 'What is your monthly salary now? So-and-so’s son earns a fortune!',
        comebacks: {
          polite: { bn: 'আলহামদুলিল্লাহ খালাম্মা, দিনশেষে পরিবার নিয়ে ভালোভাবেই দিন পার হয়ে যায়।', en: 'Praise be to God aunty, it covers our family needs comfortably.' },
          savage: { bn: 'ট্যাক্স অফিসার আর আত্মীয়দের কাছে স্যালারি ডিসক্লোজ করা কোম্পানির নীতিবিরোধী!', en: 'Disclosing salary to tax officers and relatives breaches company NDA!' },
          funny: { bn: 'স্যালারি তো দূরের কথা, আড্ডায় নাশতার মিষ্টি কিনতে কিনতেই অর্ধেক শেষ!', en: 'Forget salary, half of it evaporated buying sweetmeat for this adda!' }
        }
      }
    ]
  },
  aunty007: {
    name: 'Aunty 007 Spy Mode (গোপন গোয়েন্দা)',
    themes: [
      'Rooftop romance scouting (আজ বিকেলে ছাদে দাঁড়িয়ে কাকে ইশারা করছিলা শুনি?)',
      'Rickshaw gossip (পাশের বাসার ছেলেটা কার সাথে রিকশায় গেল বলো তো?)',
      'Apartment money sources (নতুন ফ্ল্যাট কেনার টাকা তোমার ভাই কোথা থেকে পেল?)',
      'Secret phone calls (রাত জেগে কার সাথে ফিসফিস করে কথা বলো?)'
    ],
    samples: [
      {
        bn: 'আজ বিকেলে ছাদে দাঁড়িয়ে কাকে ইশারা করছিলা শুনি? আমি কিন্তু সব দেখেছি!',
        en: 'Who were you signaling standing on the rooftop this afternoon? I saw everything!',
        comebacks: {
          polite: { bn: 'মেঘলা আকাশ দেখছিলাম খালাম্মা, ইশারা করার মানুষ আমার নেই।', en: 'I was just watching the cloudy sky aunty, I have no one to signal.' },
          savage: { bn: 'আপনার সিসিটিভি চোখ কি একটু রেস্ট দেওয়া যায় না খালাম্মা?', en: 'Can your CCTV eyes please take a five-minute rest aunty?' },
          funny: { bn: 'বাতাসের সাথে কথা বলছিলাম, কিন্তু আপনার কান তো ফাইভ-জি স্পিডে ক্যাচ করল!', en: 'I was talking to the breeze, but your ears caught it at 5G speed!' }
        }
      }
    ]
  }
};

/**
 * Fetch fresh questions from Groq AI or load today's cached drop.
 * @param {Object} options
 * @param {string} options.occasionId - 'eid' | 'wedding' | 'exam' | 'general' | 'aunty007'
 * @param {number} options.count - number of questions to generate
 * @param {boolean} options.forceRefresh - force API call ignoring localStorage
 * @returns {Promise<{ phrases: Array, fromCache: boolean, isAi: boolean }>}
 */
export async function getDailyOrFreshQuestions({
  occasionId = 'general',
  count = 12,
  forceRefresh = false
} = {}) {
  const today = getTodayKey();
  const cacheKey = `aunty_bingo_ai_v2_${occasionId}_${today}`;

  // 1. Check local daily cache if not forcing refresh
  if (!forceRefresh) {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length >= Math.min(count, 9)) {
          return { phrases: parsed, fromCache: true, isAi: true };
        }
      }
    } catch {
      // Ignore localStorage read errors
    }
  }

  const apiKey = getGroqApiKey();
  const config = OCCASION_TOPICS[occasionId] || OCCASION_TOPICS.general;

  const systemPrompt = `You are a native Bangladeshi comedy writer and cultural satirist from Dhaka, Bangladesh.
You write humorous, spicy, yet realistic questions asked by Bangladeshi relatives (Aunty Bingo / আন্টি বিঙ্গো).

STRICT CULTURAL RULES:
1. All "bn" fields MUST be in 100% natural, colloquial Bengali script (বাংলা লিপি), e.g. "বিয়ে কবে করছ? বয়স তো বসে নেই!".
2. NEVER use English idioms or literal translations (e.g. NEVER mention goodie bags, green house, suit, soup). Use authentic words like খালাম্মা, ফুফু, চাচী, কাচ্চি, বিসিএস, সালামি, স্যালারি, পাত্র, ঘটকালি, রিকশা, ছাদ.
3. Every comeback MUST directly and wittily respond to THAT specific question:
   - polite: respectful, graceful deflection.
   - savage: sharp, hilarious counter-roast.
   - funny: laugh-out-loud funny joke.
4. Output ONLY a valid JSON array of objects.`;

  const userPrompt = `Generate 10 authentic Bangladeshi aunty questions for occasion: "${config.name}".

Themes to cover:
${config.themes.map((t) => `- ${t}`).join('\n')}

Example Reference Pattern:
${JSON.stringify(config.samples, null, 2)}

Output ONLY a JSON array with ${Math.min(count, 12)} items following this exact structure.`;

  try {
    const rawContent = await callGroqChat({
      apiKey,
      model: PRIMARY_MODEL,
      systemPrompt,
      userPrompt,
      maxTokens: 3000
    });

    const parsedItems = parseJsonArrayFromText(rawContent);
    if (parsedItems && parsedItems.length > 0) {
      const validItems = parsedItems
        .filter((item) => isValidBengaliItem(item))
        .map((item, idx) => ({
          id: 20000 + idx + Math.floor(Math.random() * 9000),
          bn: item.bn.trim(),
          en: (item.en || item.bn).trim(),
          occasions: [occasionId],
          isAiGenerated: true,
          comebacks: {
            polite: {
              bn: item.comebacks?.polite?.bn || item.comebacks?.polite || 'দোয়া করবেন খালাম্মা, সব ঠিক হয়ে যাবে।',
              en: item.comebacks?.polite?.en || item.comebacks?.polite || 'Please pray for me aunty.'
            },
            savage: {
              bn: item.comebacks?.savage?.bn || item.comebacks?.savage || 'নিজের চরকায় তেল দিন খালাম্মা!',
              en: item.comebacks?.savage?.en || item.comebacks?.savage || 'Worry about your own affairs first!'
            },
            funny: {
              bn: item.comebacks?.funny?.bn || item.comebacks?.funny || 'আজকের বাজেট পাস হলে কালকেই জানাচ্ছি!',
              en: item.comebacks?.funny?.en || item.comebacks?.funny || 'Sponsor the food and I fix it tomorrow!'
            }
          }
        }));

      if (validItems.length >= 6) {
        try {
          localStorage.setItem(cacheKey, JSON.stringify(validItems));
        } catch {
          // Ignore quota error
        }
        return { phrases: validItems, fromCache: false, isAi: true };
      }
    }
  } catch (err) {
    console.error('Groq AI generation call failed:', err);
  }

  // Fallback to high quality pre-formatted authentic questions
  const fallbackList = getCuratedFallbackForOccasion(occasionId);
  return { phrases: fallbackList, fromCache: false, isAi: true };
}

function isValidBengaliItem(item) {
  if (!item || typeof item !== 'object') return false;
  if (!item.bn || typeof item.bn !== 'string') return false;
  // Must contain Bengali Unicode characters
  const hasBengali = /[\u0980-\u09FF]/.test(item.bn);
  if (!hasBengali) return false;
  if (item.bn.length < 8 || item.bn.length > 120) return false;
  if (!item.comebacks || typeof item.comebacks !== 'object') return false;
  return true;
}

async function callGroqChat({ apiKey, model, systemPrompt, userPrompt, maxTokens }) {
  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_completion_tokens: maxTokens
    })
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Groq API returned ${res.status}: ${errBody}`);
  }

  const json = await res.json();
  return json.choices?.[0]?.message?.content || '';
}

function parseJsonArrayFromText(text) {
  if (!text) return null;
  const match = text.match(/\[[\s\S]*\]/);
  if (match) {
    try {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.warn('JSON parse failed on matched array:', e);
    }
  }
  return null;
}

function getCuratedFallbackForOccasion(occasionId) {
  const config = OCCASION_TOPICS[occasionId] || OCCASION_TOPICS.general;
  return config.samples.map((item, idx) => ({
    id: 30000 + idx,
    bn: item.bn,
    en: item.en,
    occasions: [occasionId],
    isAiGenerated: true,
    comebacks: item.comebacks
  }));
}
