For Taiwan’s 18–35 working professionals in 2026, a practical default is **mobile-first discovery and light learning, desktop-heavy deep study**, rather than “mobile replaces desktop.” Taiwan overall internet traffic is majority mobile, with mobile at 56.6% in January 2026 on Statcounter and 65.6% in Similarweb’s Taiwan traffic view, but those are all-category traffic numbers, not learning-specific behavior, so self-paced learning—especially certification prep—still likely skews more desktop during longer sessions and assessments. [gs.statcounter](https://gs.statcounter.com/platform-market-share/desktop-mobile/taiwan)

## Usage split

Taiwan’s digital environment is strongly mobile, with 29.4 million mobile connections, 22.3 million internet users, and 90.3% mobile internet use on personal devices in 2025. Because certification prep involves note-taking, mock tests, spreadsheets, and longer video sessions, the most defensible estimate for **self-paced adult learning** is a split such as **55–70% mobile for browsing, reminders, short video review, and community**, but **50–70% desktop for actual serious study time and conversion-critical actions**; this is an inference from Taiwan device mix plus the desktop-friendly nature of exam prep, not a published Taiwan edtech benchmark. [eliteasia](https://www.eliteasia.co/digital-and-social-media-trends-in-taiwan-in-2026/)

## How the platforms serve mobile

**104 Nabi / 104學習** is clearly a **responsive web product** today, with mobile-friendly navigation and learning flows exposed on the web domain, and I did not find evidence in the retrieved material of a distinct Nabi native app or publicly visible PWA install positioning. Its product structure—content, certificates, assessments, co-learning, and career tools inside the browser—looks optimized for responsive web distribution and SEO/job-platform integration rather than app-store distribution first. [nabi.104.com](https://nabi.104.com.tw/posts/nabi_post_8b101ed8-7437-4de6-92c5-8d58dd852427)

For **六角學院**, the surfaced evidence points to a **web-first approach**, and notably HexSchool has published PWA educational content on its own site, which shows technical familiarity with PWAs, but that does **not** prove the main learning product itself is shipped as a consumer PWA. So the safest classification is **responsive web first, with strong front-end/mobile web competence; PWA capability plausible but not verified as the core product delivery model**. [w3c.hexschool](https://w3c.hexschool.com/blog/91a53a62)

For **Hahow**, I was only able to verify the public web experience from the homepage fetch path attempted here, not a confirmed mobile architecture signal like manifest/service worker/app-store evidence, so I should not overclaim. Based on public usage patterns and brand presence, the most cautious statement is that Hahow definitely serves learners on the web, but from the evidence gathered here I cannot verify whether its primary mobile delivery is **responsive web only, PWA-enhanced web, or companion native app**. [nabi.104.com](https://nabi.104.com.tw/posts/nabi_post_8b101ed8-7437-4de6-92c5-8d58dd852427)

## Native, PWA, or responsive

For a Taiwan learning platform under 1,000 MAU, **responsive web is the default winner**, and **PWA is the only mobile upgrade usually worth considering before native**. Responsive web gives you SEO, shareable URLs, one codebase, low maintenance, and fast iteration, while PWA adds installability, caching, and some app-like behavior without the cost of separate iOS and Android teams. [teamvoy](https://teamvoy.com/blog/native-to-pwa-mobile-app-evolution/)

Native app investment is justified only when mobile is the **core usage environment**, not just a convenience layer. In practice, that means you need one or more of these: repeated daily sessions, push-driven habit loops, meaningful offline use, camera/mic/background-device features, or evidence that app-home-screen presence materially improves retention. [jmango360](https://jmango360.com/blog/pwa-native-app-responsive-site-comparison-ecommerce/)

## When native is justified

For a **Taiwan-only learning platform with <1,000 MAU**, native usually makes sense only if you hit thresholds like these:

- **>60–70% of total study minutes already on mobile**, not just traffic share. [similarweb](https://www.similarweb.com/platforms/taiwan/)
- **High-frequency use**, such as 4+ study days per week, where push notifications and app-icon presence matter to retention. [jmango360](https://jmango360.com/blog/pwa-native-app-responsive-site-comparison-ecommerce/)
- **Offline or unstable-connectivity need**, such as commuting study with downloaded lessons or quizzes. [cloudflight](https://www.cloudflight.io/en/blog/rwd-vs-native-apps-vs-pwas-in-2024/)
- **Device-native workflows**, such as camera-based homework capture, audio speaking drills, biometric proctoring, or background audio. [cloudflight](https://www.cloudflight.io/en/blog/rwd-vs-native-apps-vs-pwas-in-2024/)
- **Enough revenue leverage** that even a small retention lift pays for iOS/Android maintenance, QA, analytics, and release overhead. [jmango360](https://jmango360.com/blog/pwa-native-app-responsive-site-comparison-ecommerce/)

If you are a **certification-prep platform** for Taiwan professionals, the likely right order is: **responsive web first → PWA if repeat mobile review is important → native only after proven mobile-heavy behavior**. [teamvoy](https://teamvoy.com/blog/native-to-pwa-mobile-app-evolution/)

## Best fit for your case

For a Taiwan cert-prep operator like your likely use case, native is usually **too early** below 1,000 MAU because the main high-value actions—watching full lessons, taking realistic mocks, comparing explanations, downloading notes, and purchasing—are all well served by desktop and mobile web. The highest-ROI setup is usually **responsive web plus mobile-optimized lesson pages, fast login, add-to-home-screen prompts, web push if supported, and short review interactions designed for phones**, then revisit native only if your analytics show mobile drives most study minutes and retention. [teamvoy](https://teamvoy.com/blog/native-to-pwa-mobile-app-evolution/)

A practical rule: if users are mostly doing **5–15 minute review sessions on phones**, build a strong mobile web/PWA layer; if they are doing **full learning journeys on phones daily**, then native starts to earn its keep. [teamvoy](https://teamvoy.com/blog/native-to-pwa-mobile-app-evolution/)

If you want, I can turn this into a **decision matrix for levelcert.com** with concrete thresholds like MAU, study-minutes share, retention lift needed, and estimated Taiwan dev cost.
