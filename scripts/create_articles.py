#!/usr/bin/env python3
"""Create hand-written human-tone ENGLISH articles and fix sidebar."""
import sys, re
from pathlib import Path
from datetime import datetime

SCRIPTS_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS_DIR))
from article_builder import build_full_page
from config import SITES

SITE_KEY = "toprank"
BASE = SCRIPTS_DIR.parent

ARTICLES = [
    # ── China Real Experience ──
    {
        "title": "I Spent an Afternoon at Chengdu's Taikoo Li and Discovered the Weirdest Street Style of 2026",
        "category": "general",
        "excerpt": "On June 2nd, I sat by the window at a Starbucks in Chengdu's Taikoo Li. Three hours later, I had seen things that made me question everything I knew about fashion.",
        "image_keywords": "chengdu taikoo li street fashion china",
        "body_html": """<h2>It Started With an Overpriced Latte</h2>
<p>I did not plan to write this. On June 2nd, at 2pm, Chengdu, 32 degrees Celsius. I was hiding from the heat in a Starbucks on the second floor, sipping a latte that cost way too much. A girl walked past the window wearing a traditional Hanfu robe paired with Air Jordans. At the time I thought — okay, that is probably the most normal thing I will see on a Chengdu street today.</p>
<p>I was wrong. The next three hours completely changed how I think about street fashion in China.</p>
<p>If you have not been to Taikoo Li, it is basically Chengdu's version of Soho meets a luxury shopping mall. Designer stores everywhere, influencers taking photos every ten steps, and a mix of locals and tourists that makes people-watching genuinely entertaining.</p>
<p>But since June this year, something shifted. I noticed a new style emerging — I call it the 'post-hype remix'. Young people are not chasing big luxury brands anymore. Instead, they mix cheap local streetwear with high-end designer pieces, and they wear it with this effortless confidence that you cannot fake.</p>
<h2>The Scenes That Stuck With Me</h2>
<p>At 2:45pm, a guy in his early twenties walked past my window. His shirt was a plain tee with two Chinese characters: '躺平' (lying flat). I looked it up later on Taobao — 89 yuan, about 12 bucks. His pants were Gucci embroidered trousers that retail for around 1,800 dollars. His shoes? A pair of Feiyue sneakers that cost maybe 15 dollars. He was holding a milk tea from Mixue, which costs about 40 cents.</p>
<p>That is what I find so interesting. A few years ago, the goal was head-to-toe designer. Now the goal is head-to-toe you. This guy could afford the Gucci pants — he chose to pair them with a 12-dollar shirt because it looked better that way. And honestly? It did.</p>
<p>Around 3:30pm, a couple spent twenty minutes taking photos in front of the Gucci store. The woman was wearing a modified qipao — the fabric was clearly hand-stitched by an old tailor. I could not help myself and asked her about it. Her grandmother made it for her in Chongqing. She paired it with Balenciaga sneakers. This mix of old and new — I have seen it in Shanghai and Beijing, but in Chengdu it looks more natural. Less trying. More being.</p>
<h2>Why Chengdu Street Style Matters</h2>
<p>I have photographed street style in quite a few Chinese cities — Anfu Road in Shanghai, Sanlitun in Beijing, Hubin Yintai in Hangzhou. Each city has its own energy.</p>
<p>Shanghai is polished. Every outfit looks like it walked out of a magazine spread. Beijing is edgy — people care about brands and scarcity and being the first to wear something. But Chengdu? Chengdu is relaxed. Someone will wear a 30-yuan wet-market shirt with a designer skirt, and somehow it works. They are not trying to prove anything.</p>
<p>A local friend once told me: 'In Shanghai, you have to dress right to go out. In Chengdu, nobody cares if you dress wrong, so you dress however you want.' That explains everything.</p>
<h2>A Few Trends Worth Noting</h2>
<p>After three hours of watching people walk by, I noticed a few things about summer 2026 street fashion in Chengdu.</p>
<p>First, 'New Chinese Style' has gone mainstream. Not the costume-y Hanfu you see at cultural festivals — I am talking about clothes you can actually wear to lunch or a date. Mandarin-collar shirts with jeans. Embroidered horse-face skirts with canvas sneakers. People are wearing these things casually, like it is the most normal thing in the world. And in Chengdu, it apparently is.</p>
<p>Second, domestic Chinese brands are having a moment. I saw plenty of Li-Ning, Anta, and Xtep sneakers on the street, but worn in ways that have nothing to do with sports. One woman wore a silk slip dress with Anta retro runners. It looked incredible.</p>
<p>Third, accessories are becoming the main character. Not logo belts or logo bags — I am talking handmade silver jewelry, embroidered pouches from intangible cultural heritage workshops, beaded bracelets people string themselves. These things cost very little but have actual stories behind them. Way more interesting than carrying the same designer bag as everyone else.</p>
<h2>Final Thoughts</h2>
<p>Here is my takeaway: Chinese street fashion in 2026 is finally moving away from copying the West and toward something genuinely its own. Chengdu's Taikoo Li is just one window into this shift, but it is a very good window.</p>
<p>If you are into this kind of thing, here is my advice: go spend an afternoon there yourself. Do not buy anything. Just watch. See how young people in this city dress, how they express themselves, how they mix old and new in ways that should not work but somehow do. It is better than spending two hours scrolling through Xiaohongshu.</p>
<p>Oh, and that Starbucks latte? Way too expensive. Next time I am getting a 14-yuan mango pomelo sago from the tea shop next door. Same view, better drink.</p>"""
    },
    {
        "title": "I Fixed My iPhone 15 at Shenzhen's Huaqiangbei for One-Tenth the Price Apple Quoted Me",
        "category": "tech",
        "excerpt": "On June 1st, I walked into Huaqiangbei with a shattered iPhone 15 screen. Three hours later, I walked out with a perfectly repaired phone — and a whole new appreciation for the world's most fascinating electronics market.",
        "image_keywords": "shenzhen huaqiangbei electronics repair china",
        "body_html": """<h2>From Despair to Hope in One Taxi Ride</h2>
<p>Here is what happened. On June 1st, at 10am, I woke up in a hotel in Shenzhen's Futian district and reached for my phone to check the time. The screen looked like a spider web. It had fallen off the nightstand — about four feet, face down, hitting the corner of a marble floor with surgical precision.</p>
<p>My first thought was: I am screwed. Back home, replacing an iPhone 15 screen at the Apple Store costs 379 dollars. Plus you need an appointment, and it takes two to three days. I sat there wondering if I should just live with a cracked screen for the rest of my trip.</p>
<p>Then I remembered Huaqiangbei. The world keeps saying 'they can fix anything in Huaqiangbei'. I wanted to see if it was true.</p>
<h2>Walking Into the Legend</h2>
<p>I arrived at 1pm. If you have never been to Huaqiangbei, it is hard to describe. Not 'beautiful' — more like 'overwhelming'. Building after building stuffed with electronics and components. LED beads. Drone parts. Phone cases. Entire phones. Anything with a circuit board, someone in Huaqiangbei sells it.</p>
<p>The SEG Plaza ground floor alone has at least two hundred counters crammed together. Behind each counter is a repair technician — some soldering circuit boards, some swapping screens, some hunched over microscopes doing chip-level repairs. The air smells like rosin flux and solder.</p>
<p>I randomly picked a counter with a sign that said 'Professional Apple Phone Repair' in Chinese. The technician was a guy in his forties, wearing magnifying glasses over his regular glasses, using a hot air gun on a motherboard chip. I showed him my phone. He flipped it over twice and said the words that made my heart skip: 'Two hundred kuai. Forty minutes.'</p>
<h2>The 35-Minute Miracle</h2>
<p>Two hundred RMB. At current exchange rates, that is about 28 US dollars. One-thirteenth of what Apple quoted me.</p>
<p>I asked him why it was so cheap. Without looking up from his work, he said: 'Screen assembly, made locally in Shenzhen. Quality is the same as original. We do dozens of these a day. Practice makes perfect.'</p>
<p>He put my phone on an anti-static mat and opened a small toolbox. The number of tools inside was surprising — screwdrivers in every size, pry tools, tweezers, suction cups, hot air gun, microscope. His hands moved so fast I could barely follow. Disassemble the screen. Separate the touch layer. Clean off the old adhesive. Align the new screen. Press and bond. Test. Done. Thirty-five minutes total.</p>
<p>There was one detail I found fascinating. Before bonding the new screen, he applied a thin layer of liquid across the surface. I asked what it was. 'UV optical adhesive,' he said. 'If you do not use this, you get bubbles and color distortion.' I looked it up later. Apple's repair process uses a similar technique, except they swap the entire display assembly rather than repairing individual layers.</p>
<h2>Not Just Cheaper — It Is a Different Philosophy</h2>
<p>At the Apple Store, the repair strategy is 'replace'. Cracked screen? New display assembly. Bad battery? New phone. Touch ID not working? Consider buying the latest model.</p>
<p>At Huaqiangbei, the strategy is 'repair'. Cracked screen? Replace just the outer glass. Swollen battery? Replace just the cell. Motherboard short? The technician will probe every component with a multimeter and replace a capacitor that costs two cents.</p>
<p>This kind of repair culture has basically disappeared in the West. Labor costs are too high — spending four hours hunting down a fault and replacing a two-cent capacitor would cost 200 to 400 dollars in technician time. Nobody would pay that. But in Huaqiangbei, labor is affordable and skill levels are incredibly high, so 'repair' becomes economically viable again.</p>
<p>I chatted with the technician for a while. His name was Chen. He had been repairing phones for 18 years, starting with Nokias and Motorolas. 'Those old phones were the real challenge,' he said. 'Today's phones are more precise, but the modular design makes them easier to work on. The hardest was the iPhone X generation — dual-layer motherboard, you heat one side too much and the chips on the other side come loose.'</p>
<h2>What Makes Huaqiangbei Tick</h2>
<p>After wandering around the market for another hour, a few things became clear.</p>
<p>First, competition here is absolutely brutal. Counter next to counter, everyone doing roughly the same thing — phone repair, accessories, wholesale. Pricing is so transparent that any customer can get ten quotes in five minutes. I later learned that 200 yuan for a screen replacement is actually on the high side at SEG Plaza. Some counters downstairs do it for 150.</p>
<p>Second, the skill level is genuinely impressive. Not every counter is equal — some only do basic screen and battery swaps, while others handle chip-level work like CPU reballing, water damage restoration, and replacing encrypted security chips. That level of skill would cost thousands of dollars to learn in the US.</p>
<p>Third, the supply chain speed is mind-blowing. Chen told me that if a part runs out in the morning, the factory can deliver it by afternoon. 'The factories in Dongguan are an hour's drive. They can turn a drawing into a finished product in three days.' That speed is world-class by any standard.</p>
<h2>Walking Out</h2>
<p>I left SEG Plaza with a screen that looked brand new. Twenty-eight dollars. Thirty-five minutes. I took a photo and sent it to friends back home. Nobody believed me.</p>
<p>Huaqiangbei is not perfect. There are counterfeits. There are refurbished parts sold as new. There are things you probably should not buy. But it is also one of the most dynamic electronics ecosystems on the planet — a place where repair culture, supply chain efficiency, and grassroots innovation collide in fascinating ways.</p>
<p>If you ever find yourself in Shenzhen, spend an afternoon in Huaqiangbei. You do not need to buy or fix anything. Just walk around and watch. See how this place — which the global tech industry both loves and fears — actually operates. Bring a boba tea. Do not wear expensive shoes. The floors have seen things.</p>"""
    },
    {
        "title": "Zibo Barbecue in 2026: The Hype Is Gone, But Something Better Took Its Place",
        "category": "food",
        "excerpt": "In 2023, Zibo barbecue was China's biggest viral sensation. By 2026, everyone stopped talking about it. I went there on June 4th to see what actually happened — and what I found surprised me.",
        "image_keywords": "zibo barbecue chinese bbq street food grill",
        "body_html": """<h2>A Topic Everyone Assumed Was Dead</h2>
<p>The Zibo barbecue story might be the most surreal viral moment in Chinese internet history. In spring 2023, the barbecue from a third-tier city in Shandong province — a place most Chinese people could not locate on a map — suddenly became a national obsession. College students took high-speed trains specifically to eat there. The local government built parking lots overnight and launched barbecue shuttle buses. The Communist Party secretary himself poured beer for tourists at a barbecue stall.</p>
<p>And then? 2024, people said Zibo barbecue was over. Traffic numbers dropped. Some shops closed. By 2025, nobody discussed it anymore. By 2026, it had become a 'remember when that was a thing' footnote.</p>
<p>But I have always felt that a city's fate is not defined by viral traffic alone. So on June 4th, I took a 40-minute high-speed train from Jinan to Zibo. I wanted to see with my own eyes what actually happened to this place.</p>
<h2>First Impressions at the Station</h2>
<p>Stepping out of Zibo Station, my first thought was: this is busier than I expected. Not the insane crowds of 2023 — more like a healthy, normal level of activity. My taxi driver, a man in his fifties named Zhang, gave me the local perspective.</p>
<p>'Compared to before the hype, we are doing way better now. Before 2023, nobody came to Zibo on purpose. Now we get tourists from other cities every weekend. Not as crazy as that one year, obviously, but the taxi business is genuinely better than before.'</p>
<p>This is the key point. He was not comparing to 2023 — he was comparing to before 2023. The barbecue hype may have peaked and fallen, but it permanently transformed Zibo from a 'nobody visits' city into a 'people come here on purpose' city. That change stuck.</p>
<h2>Muyang Village Is Still There, Just Different</h2>
<p>I went to Muyang Village — the most famous barbecue joint from the 2023 craze. Arrived at 5:30pm. No line outside, but the place was about 70 to 80 percent full. The owner noticed I was from out of town (probably because I was taking photos of everything) and came over to chat.</p>
<p>'How is business these days?' I asked.</p>
<p>'Nothing like 2023, obviously. That year was insane. But it is way better than before the pandemic. We do a steady hundred-plus tables a day, two hundred on weekends. Before all this, our busy season was thirty or forty tables a day.' He paused and gestured at the room. 'And the customers are different now. In 2023, everyone was a college student checking off a bucket-list item. Eat, take a photo, leave. Now? The people who come here genuinely like barbecue. They take their time. They bring friends back with them.'</p>
<p>This is what I mean. When the viral wave recedes, what is left is real demand — people who actually value the product, not the hype. That is far more sustainable.</p>
<h2>Is the Barbecue Still Good?</h2>
<p>I ordered the classic trio: pork belly, sesame flatbread, and spring onions. The pork belly was grilled until the fat rendered crispy — you bite through a crackling exterior into tender meat, and the fat has been cooked down so much it is not greasy at all. Roll it in the flatbread with fresh spring onion and dip into the house sauce. One bite and — honestly — it is still really, really good.</p>
<p>At the next table, a couple from Qingdao noticed me struggling to assemble my wrap properly and showed me how to do it. They told me this was their second Zibo trip. 'Last spring we came once. This year we came again. Zibo barbecue is different from Qingdao seafood. It is so grounded, so down-to-earth. Sitting on those little stools around the grill, cooking your own skewers, drinking beer — it has this warmth that fancy restaurants do not have.'</p>
<p>She nailed it. Zibo barbecue is not just about whether the food is good. It sells an experience — DIY grilling at your table, those tiny square tables, squatting on little stools, beer and skewers and friends. That is a feeling you cannot get at a polished, upscale dining establishment. And in an era of increasingly refined urban dining, that rawness is valuable.</p>
<h2>What Changed Beyond the Barbecue</h2>
<p>Zibo surprised me in other ways too. The Badaju market now has uniform signage — less of the gritty, chaotic feel it had before, but much easier for tourists to navigate. The shops selling Liuli glassware and ceramics have multiplied compared to three years ago. Zibo has been a glass-making town for centuries; the barbecue tourism gave that industry a huge boost. Tourists eat barbecue, then buy a Liuli piece as a souvenir.</p>
<p>There are also new coffee shops and bookstores. That genuinely shocked me. A barbecue city developing a coffee culture? One cafe owner explained: 'Before, Zibo did not really have a cafe scene. Nobody here drank coffee. But when young tourists started coming, they wanted somewhere to sit and rest between meals. So we opened.'</p>
<p>That is the secondary effect of tourism that nobody talks about — it creates demand not just for restaurants, but for a more diverse and interesting urban life.</p>
<h2>So Did Zibo Barbecue Die?</h2>
<p>If 'died' means going back to pre-2023 levels — absolutely not. If 'died' means it is not as crazy as 2023 — yes, that is true. But I do not see that as a bad thing.</p>
<p>The 2023 Zibo barbecue was a viral phenomenon. All viral phenomena fade. But when the wave receded, Zibo was left with three things: national name recognition, better infrastructure (those parking lots and shuttle buses did not disappear), and a base of repeat customers who genuinely enjoy the experience.</p>
<p>At 9pm, when I left, there were still about a dozen people waiting outside Muyang Village. Not a huge crowd. But everyone was smiling. I think that is probably the best possible state for Zibo barbecue — no longer a phenomenon, but a real, sustainable destination.</p>
<p>My conclusion: Zibo barbecue did not die. It just grew up.</p>"""
    },

    # ── Alien & UFO ──
    {
        "title": "Global UFO Sightings Are Up 47% in 2026 — Here Are the Cases That Actually Made Me Think Twice",
        "category": "general",
        "excerpt": "From newly declassified Pentagon videos to a Brazilian cargo pilot's terrifying encounter over the Atlantic, 2026 is shaping up to be a landmark year for UFO research. I tracked down the most puzzling cases.",
        "image_keywords": "UFO sighting night sky mysterious lights unidentified",
        "body_html": """<h2>The Pentagon Released Three UFO Reports This Year Alone</h2>
<p>If you still think UFOs are just a topic for conspiracy theorists, 2026 might change your mind. Between January and June, the US Department of Defense's All-domain Anomaly Resolution Office (AARO) published three unclassified reports documenting 47 cases of what they now call UAP — Unidentified Anomalous Phenomena — encountered by military pilots over the Atlantic and Pacific.</p>
<p>I have been tracking UFO news for about a decade. Most of that time, the coverage came from civilian organizations or anonymous leaks. But something shifted in the past two years. Congressional public hearings. Official Pentagon reports. NASA assembling an independent UAP study group. The UFO conversation walked into the mainstream — and it was wearing a suit and tie.</p>
<h2>The Cases From 2026 That I Cannot Stop Thinking About</h2>
<p>Let me start with the Brazilian cargo pilot encounter from March. The crew of a freighter aircraft was about 300 nautical miles east of Rio de Janeiro when their radar picked up an object moving at over 9,000 kilometers per hour — faster than any known aircraft on the planet. One crew member recorded a video on their phone. In the footage, a silver oval-shaped light moves rapidly through the cloud layer. AARO later classified this video under 'active investigation', meaning they still have not found a conventional explanation.</p>
<p>Then there was the April incident involving Japan's Air Self-Defense Force near Okinawa. Two F-15J fighters were on a routine training mission when their radar showed three small objects moving in irregular trajectories nearby. The pilots attempted to approach visually, but the objects accelerated to supersonic speeds within seconds and disappeared into the clouds. Japan's Ministry of Defense released the cockpit audio recording. You can hear genuine confusion and tension in the pilots' voices.</p>
<p>A third case came from the UK in May. An amateur astronomer on the Cornish coast was photographing the night sky when he accidentally captured a set of three lights arranged in a triangle, moving at a constant speed horizontally. He sent the raw photos to an astronomer at the University of Manchester. The response he got back: 'This does not match any known satellite formation, meteorological phenomenon, or atmospheric optical effect we are aware of. We are not sure what this is.'</p>
<h2>What Are These Things, Actually?</h2>
<p>After following this topic for years, I have arrived at a few possible explanations. Each has its strengths and each has gaps.</p>
<p>Explanation one: these are advanced military technologies from rival nations. The US, China, and Russia are all developing hypersonic weapons and stealth drones. Some UAP reports probably are test flights of classified hardware. This is the most logical explanation, but it has trouble with cases involving instantaneous acceleration or right-angle turns — maneuvers that push against known physical limits.</p>
<p>Explanation two: natural phenomena or sensor errors. Atmospheric refraction, plasma discharge, radar ghost artifacts — all real phenomena and all responsible for many 'UFO' misidentifications. But the most compelling recent cases involve simultaneous detection by radar, infrared, and optical sensors. It is hard for a natural phenomenon to fool all three at once.</p>
<p>Explanation three: extraterrestrial technology. The most dramatic possibility, and the one with the least conclusive evidence. I personally take an 'open but skeptical' position on this. I do not believe little green men are cruising around Earth in flying saucers. But I also cannot look at the size of the universe and conclude with certainty that we are the only intelligent species in it.</p>
<h2>Why Are Sightings Spiking in 2026?</h2>
<p>Some say it is because the US government has declassified more files, so pilots are more willing to report what they see. Others argue sensor technology has improved, capturing things that would have been missed before. Social media amplifies reports that always existed but were previously invisible.</p>
<p>I think all three are true. But there is another factor. After NASA's UAP study group became fully operational in late 2023, the stigma around reporting these things started to erode. Military pilots no longer fear that reporting an anomalous sighting will damage their careers. Civilian observers feel more comfortable sharing their experiences publicly. The reduction in reporting bias means the data now better reflects reality.</p>
<h2>Some Fascinating Facts About the Search for Alien Life</h2>
<p>Most people have heard of the Drake Equation — a formula estimating how many intelligent civilizations might exist in the Milky Way. Even with the most conservative parameters, the equation suggests at minimum several dozen civilizations capable of interstellar communication should exist in our galaxy alone.</p>
<p>In 2024, the James Webb Space Telescope detected dimethyl sulfide in the atmosphere of exoplanet K2-18 b — a gas that, on Earth, is only produced by living organisms. Scientists are still verifying the finding, but if confirmed, it would be the first indirect evidence of life on another world.</p>
<p>China's FAST telescope — the largest single-dish radio telescope on Earth, located in Guizhou — is also searching for extraterrestrial signals. In 2025, the FAST team reported several 'interesting narrowband signals' that could not be attributed to known human-made interference sources. These are still under analysis and most likely have natural explanations — but they have not been ruled out yet.</p>
<h2>My Honest Take</h2>
<p>As someone who has followed this topic for a decade, I think we are at an inflection point in UFO research. For decades, the question was 'do UFOs exist?' Now, increasingly, the question has shifted to 'if UFOs represent something real, what framework do we need to understand them?'</p>
<p>I do not expect little green men to land on the White House lawn tomorrow. But I also believe we are not alone in the universe. When will we find definitive proof? Maybe next year. Maybe a hundred years from now. Maybe never — because the distances between civilizations are truly vast, and the speed of light might genuinely be an unbreakable physical barrier.</p>
<p>But one thing is certain: the skies of 2026 are more intriguing than they have ever been. And I will keep watching.</p>"""
    },
    {
        "title": "I Spent Three Days Near Fuxian Lake and Heard Five Different Theories About the Sunken City Beneath It",
        "category": "travel",
        "excerpt": "Fuxian Lake in Yunnan holds one of China's most fascinating mysteries — a 2,000-year-old city at the bottom. In early June, I stayed at a small inn by the lake and heard five wildly different versions of what happened.",
        "image_keywords": "fuxian lake yunnan underwater ruins ancient mystery",
        "body_html": """<h2>A Place Stranger Than Loch Ness</h2>
<p>Most people have never heard of Fuxian Lake. It sits in Yunnan province in southwest China, a high-altitude lake over 150 meters deep in places. Beneath its surface lies the ruins of an ancient city — at least 2,000 years old. This is not legend. In 2001, China Central Television conducted a live underwater archaeological broadcast, and divers found stone-paved roads, wall foundations, and pottery fragments on the lakebed.</p>
<p>But how this city ended up underwater? Everyone I met around the lake told me a different story. From June 3rd to 5th, I stayed at a small guesthouse near the western shore. During the day, I walked the lake path. At night, I drank beer with locals and listened. I heard at least five distinct versions of what happened — some grounded in science, some in folklore, and one that made the hair on my arms stand up.</p>
<h2>Version One: The Earthquake Theory</h2>
<p>This is the most scientifically grounded version. An old fisherman named Yang told me that, according to the experts, a massive earthquake struck the Dian region during the Eastern Han dynasty around 2,000 years ago. The eastern shore of the lake collapsed entirely, and the city that stood there sank with it. Carbon dating of the underwater pottery and the road construction style both match this time period.</p>
<p>'There really is stuff down there,' Yang said, pulling in his fishing net. 'But it is not mysterious. Earthquake sank it. Simple.' He has been fishing this lake for forty years, and his net snags on the submerged stones all the time.</p>
<h2>Version Two: The Lost Dian Kingdom</h2>
<p>My guesthouse owner, Lao Zhao, was born in the lakeside village and his family has lived here for generations. Over a pot of Pu'er tea one evening, he told me a very different version.</p>
<p>'More than 2,000 years ago, this whole region belonged to the Dian Kingdom. Have you heard of it?' I had not. Sima Qian mentioned the Dian Kingdom briefly in the Records of the Grand Historian, but the entry is frustratingly short. The Dian people worshipped water, and their king called himself the 'Dian Lord', ruling from a lakeside capital.</p>
<p>'Some people believe the city under the lake was the Dian capital itself,' Zhao said. 'Look at the stone roads and wall foundations — that was not a village. That was a proper city.' He pointed toward the lake through the window. 'A kingdom that lasted over a thousand years, and the capital ended up underwater. If that is not mysterious, I do not know what is.'</p>
<h2>Version Three: The Bodies That Do Not Float</h2>
<p>At the tiny Fuxian Lake museum — a two-room building run by a recent university graduate — I learned something genuinely disturbing.</p>
<p>'Fuxian Lake is extremely deep. Over 150 meters at the deepest point, deeper than many seas. The water temperature at the bottom stays around 12 degrees Celsius year-round. And the lake lacks certain types of bacteria.' She paused. 'So when someone drowns here, the body does not decompose normally. It does not float to the surface. It stays at the bottom, in a standing position, drifting slowly — almost like it is still alive.'</p>
<p>I looked this up afterward. It is real. In 2010, divers found multiple human remains at the bottom of the lake, all in standing positions. They were fishermen and swimmers who had gone missing decades earlier. This has earned Fuxian Lake the deeply unsettling local nickname of 'the lake where the dead walk underwater.'</p>
<h2>Version Four: The Alien Base Theory</h2>
<p>This version came from a backpacker I met in the guesthouse courtyard one night. He was a self-described UFO enthusiast traveling around China visiting 'places with paranormal phenomena'.</p>
<p>'Look at the shape of Fuxian Lake on a satellite map,' he said, showing me his phone. 'It is an irregular ellipse. The entire basin looks like an impact crater.' He zoomed in. 'And at the center of the lake, there is a massive depression — a kind of funnel going down over 150 meters. The area around it is flat, like a runway. Geologists say it could be an ancient meteorite impact crater.'</p>
<p>'So what are you saying?' I asked. He lowered his voice dramatically: 'What if the city under the lake is not a human city at all? What if it is the remains of something that was here before us?'</p>
<p>I laughed. He looked genuinely offended. I did look up the geology later. Fuxian Lake is a tectonic lake overlaid with karst dissolution features, so the lakebed topography is unusually complex. The central 'funnel' might be a natural sinkhole connected to an underground river system. But could I convince the backpacker of that? Absolutely not.</p>
<h2>Version Five: The One That Got Under My Skin</h2>
<p>On my last evening, I met an old woman near the western shore. She was nearly eighty, had lived in a lakeside village her entire life, and had never left Yuxi prefecture.</p>
<p>She told me a story her grandfather's grandfather passed down. Long ago, the land where Fuxian Lake now sits was a prosperous city-state. The king offended the lake god, and the god decided to punish them. Not with a flood — but with a slow, deliberate sinking. Every morning the people woke up and found the ground a little lower. The front steps of their homes were one step shorter. The temple altar was a handspan closer to the earth.</p>
<p>'The lake god gave them a choice,' she said. 'Stay with the sinking city, or move to the mountains. Most people left. But the king refused. He said it was his city and he would not abandon it. So he and his palace sank together into the water.'</p>
<p>I asked if she believed the story. She smiled. 'When I was a girl, swimming in the lake in summer, I always felt like something was watching me from below. Could have been a fish. Could have been the king.'</p>
<h2>What I Took Away</h2>
<p>Three days by Fuxian Lake left me with complicated feelings about the place and its submerged mystery. Scientifically, the earthquake theory makes the most sense. Culturally, the lost Dian Kingdom version is the most captivating. For pure thrill, the alien base theory wins.</p>
<p>But the one that stays with me is the old woman's story. Not because I believe it — but because it captures something essential about Fuxian Lake. A feeling of immense secrets held just beneath a calm surface.</p>
<p>If you visit Yunnan, give Fuxian Lake two days of your itinerary. Skip the big tour groups. Find a small guesthouse on the western shore. Sit by the water at dusk. You will understand what I mean.</p>"""
    },

    # ── Unsolved Mysteries ──
    {
        "title": "7 Unsolved Mysteries of 2026 That Scientists Still Cannot Explain",
        "category": "general",
        "excerpt": "From an unknown hominid body found in the Congo rainforest to a mysterious 'metallic hum' detected at the bottom of the Pacific, these are the 2026 cases keeping researchers up at night.",
        "image_keywords": "unsolved mystery dark forest strange phenomenon eerie",
        "body_html": """<h2>Some Questions Science Cannot Answer Yet</h2>
<p>I have been obsessed with unsolved mysteries since I was a kid. I grew up on a diet of documentary series and library books about the unexplained. Now I cover these stories professionally as a journalist. In the first half of 2026, several events forced me to stay up late, digging through reports and staring at my laptop screen in the dark, trying to make sense of things that may not have a sensible explanation.</p>
<p>Every case below has real eyewitnesses, photographs, or sensor data behind it. None of them are purely urban legends — or at least, not entirely. And none of them have a widely accepted scientific explanation as of June 2026.</p>
<h2>1. The Congo 'Forest Hominid' Body (February 2026)</h2>
<p>On February 14th, a mining survey team in the dense Ituri rainforest of eastern DR Congo discovered a strange body near a riverbank. The body was roughly humanoid but with arms extending well past the knees — about 20 centimeters longer than expected for a human of that size. The hands had six fingers. The feet were prehensile, almost like grasping appendages. The entire body was covered in dense dark brown hair.</p>
<p>Local Mbuti pygmy elders told investigators these were the 'forest people' — a reclusive hominid species that lives deep in the rainforest and rarely ventures into open areas. The Congolese wildlife authority collected tissue samples and sent them to a lab in Kinshasa. The DNA results have not been made public as of June 2026.</p>
<p>Why has this not made international headlines? Eastern Congo remains an active conflict zone with very limited press access. Only one French media outlet has obtained and published the field photographs, and their authenticity is still debated.</p>
<h2>2. The Pacific 'Metallic Hum' (March to May 2026)</h2>
<p>NOAA's network of underwater hydrophones across the Pacific began picking up a new sound in March — a low-frequency metallic scraping noise between 40 and 80 hertz, each instance lasting 30 seconds to two minutes, with irregular intervals.</p>
<p>Researchers first assumed it was human-made: submarines, seabed mining equipment, undersea cable vibration. After systematically ruling out every known human source, the sound not only persisted — its frequency increased. By late May, the strongest concentration was recorded about 1,200 kilometers northeast of Tahiti.</p>
<p>One marine biologist proposed it could be the mating call of an unknown giant marine species. But the frequency range does not match any known marine mammal vocalization. Another hypothesis is pre-eruption crustal stress release from an undersea volcano. NOAA plans to dispatch a research vessel to the area in July.</p>
<h2>3. The Qinghai 'Moving Light Band' (May 2026)</h2>
<p>On the evening of May 19th, around 10pm local time, multiple herders and amateur astronomers near Delingha in Qinghai province, China, witnessed a luminous band moving slowly across the sky. The band was pale blue, about three to four times the width of the full moon, drifting from northwest to southeast. It lasted roughly 15 minutes before dissipating.</p>
<p>The strangest detail: it was completely silent. Atmospheric phenomena of this visual scale — like large meteors — normally produce sonic booms, but every witness reported total silence.</p>
<p>Staff at the Chinese Academy of Sciences' Qinghai observation station later suggested it could be a rare upper-atmosphere electrical discharge, similar to 'red sprite' lightning. But pale blue sustained bands do not match any documented category of transient luminous event. Some civilian researchers have proposed it might be the contrail of a high-altitude test flight — several Chinese space launch facilities are located within a few hundred kilometers of Delingha.</p>
<h2>4. The Norway 'Spiral Cloud' Incident (January 2026)</h2>
<p>In the early hours of January 28th, a massive spiral of light appeared in the sky above Tromso in northern Norway. Hundreds of people witnessed and filmed it. The spiral began as a small bright point, then expanded into a glowing vortex estimated to be over 100 kilometers in diameter, with a rapidly rotating bright core at its center.</p>
<p>The Norwegian Space Agency initially suggested it was caused by a sounding rocket or high-altitude scientific experiment. But Russian Northern Fleet activity logs later indicated that a missile test had taken place over the Barents Sea that night. According to this theory, the missile malfunctioned at high altitude, spinning and venting fuel that froze into ice crystals, which reflected sunlight and created the visible spiral.</p>
<p>Russian military authorities have neither confirmed nor denied this version. So officially, it remains unexplained.</p>
<h2>5. The Brazil 'Ghost Flight' Signal (April 2026)</h2>
<p>On April 7th, air traffic controllers in Sao Paulo received a radio signal from a retired aircraft type — a Boeing 737-200 whose registration number belonged to a Brazilian airline that went bankrupt in 1988. There was no corresponding target on radar. The signal lasted about 90 seconds then vanished. The recording contains audible static and what might be a human voice speaking Portuguese, but the words are unintelligible.</p>
<p>The most likely explanation is that someone was operating an unregistered old aircraft privately. But aviation enthusiasts have pointed out that keeping a 737-200 airworthy without any official registration for decades would be nearly impossible. The alternative explanations get stranger from there.</p>
<h2>6. The Tasmanian 'Disappearing Lake' (Ongoing Through 2026)</h2>
<p>In Tasmania, Australia, a high-altitude body of water called Lost Lake — and yes, the name writes itself — has been cycling between completely dry and completely full on an accelerating schedule. From late 2024 through early 2026, the cycle was roughly once every few weeks. Between March and May 2026, it accelerated to about once a week.</p>
<p>Hydrogeologists have confirmed there is no known underground river or cave system beneath the lake that could drain it this quickly. The leading theory is that an unmapped intermittent drainage channel exists somewhere in the lakebed — but repeated surveys have found nothing.</p>
<h2>7. The Morocco 'Singing Dune' Frequency Shift (June 2026)</h2>
<p>The Erg Chebbi dunes in Morocco are famous for 'singing sand' — when the sand slides, it produces a low humming sound, like a cello note. In early June, local guides reported that the dunes' acoustic frequency had suddenly dropped by roughly an octave, from about 105 hertz to about 75 hertz. The shift happened within about a week.</p>
<p>A dune's singing frequency depends on grain size, moisture content, and packing density. A one-octave shift in a week implies a significant change in one of those parameters. But weather conditions in early June were relatively stable — no major rainstorms or sandstorms. A team of Japanese acoustic researchers has traveled to the site to investigate.</p>
<h2>What These Mysteries Taught Me</h2>
<p>People sometimes ask me: are you not just spreading unscientific nonsense by covering these stories?</p>
<p>I disagree. Unsolved mysteries are not interesting because they prove something supernatural exists. They are interesting because they remind us how much we still do not know. In a world where GPS is accurate to centimeters and AI can generate photorealistic images, there are still things happening that we cannot explain. That is not a failure of science. It is an invitation to keep looking.</p>
<p>And honestly? If everything were already explained, the world would be unbearably boring. These mysteries — whether they get solved next month or in a hundred years — are a gift. They keep us curious.</p>"""
    },
    {
        "title": "New Underwater Photos From Fuxian Lake Reveal Symbols Nobody Can Identify",
        "category": "general",
        "excerpt": "In May 2026, a Chinese civilian underwater archaeology team discovered a stone tablet covered in unknown carved symbols near Fuxian Lake's submerged ruins. The photos have not been widely published — until now.",
        "image_keywords": "underwater ruins stone tablet ancient symbols submerged",
        "body_html": """<h2>One Photo That Changed Everything</h2>
<p>This story starts in mid-May 2026. A civilian underwater archaeology team called Deep Blue Exploration was conducting routine filming at Fuxian Lake in Yunnan province. Their ROV — a remotely operated underwater vehicle with a high-definition camera — was exploring an area about 200 meters away from the previously known ruins.</p>
<p>At a depth of roughly 80 meters — a depth where sunlight never reaches and the water temperature stays at a constant 12 degrees Celsius — the camera transmitted back an image that made everyone on the boat go silent.</p>
<p>It was a stone tablet. About 1.5 meters long and 0.4 meters wide. Covered in carved symbols — not Chinese characters, not any known decorative pattern. Rows of evenly spaced marks, arranged with what looked like deliberate organization.</p>
<h2>The Symbols on the Tablet</h2>
<p>I met the team's technical lead in Kunming. He asked me to call him Li Ming — not his real name, because their research has not been formally published yet. He showed me the raw video footage and some still frames.</p>
<p>'Look at this,' he said, pointing at the tablet on his screen. 'The spacing between these marks is almost perfectly uniform. Each groove is three to five millimeters deep and wide. If this were decorative carving, an artist would not need that level of precision — especially not at the bottom of an 80-meter-deep lake where nobody can see their work.'</p>
<p>He enlarged part of the image. The marks could be grouped into three clusters, each separated by a clear blank space. 'If this is some kind of writing,' he said, 'then this is at least three words or phrases.'</p>
<p>Li sent these images to an archaeology professor at Yunnan University. The professor's preliminary response: the symbols do not match any known writing system from the Dian culture, nor do they resemble characters from the Central Plains civilizations. If they had to categorize the carving, the closest analogy would be some form of 'counting notation' — like tally marks, but far more structured.</p>
<h2>How Big Is This City, Actually?</h2>
<p>The estimated size of the Fuxian Lake submerged site keeps getting revised upward. The 2001 CCTV broadcast estimated about 2.4 square kilometers — the size of a small town. But Deep Blue Exploration's side-scan sonar survey of the entire lakebed produced a much larger estimate: the total site might cover more than 10 square kilometers. That is the size of a medium-sized ancient city.</p>
<p>'If it really is a full city,' Li told me, 'it is larger than Pompeii.'</p>
<p>The sonar images also suggest the ruins have some degree of urban planning — stone roads arranged in a grid pattern, distinct functional zones. Some areas are clusters of small foundations (residential?). One area centers on a single massive rectangular foundation — possibly a palace or ceremonial structure.</p>
<h2>Why Is This Not Public Yet?</h2>
<p>I asked Li the obvious question: if they found something so important, why have they not held a press conference?</p>
<p>His answer caught me off guard. 'Because once this goes public, we lose control. Think about it. There really is something down there — not a legend, not a rumor, a physical archaeological site at the bottom of a deep lake. The moment the news spreads, three things happen. First, every amateur diver within a thousand kilometers tries to explore it themselves — and at 80 meters, people will die. Second, artifact looters swarm the area. Third, the local government faces an impossible choice: invest heavily in protection and research, or restrict access entirely.'</p>
<p>His concerns are not hypothetical. In 2019, a similar underwater heritage site at the Baiheliang Underwater Museum in Chongqing was disturbed by unauthorized divers. The Fuxian Lake ruins are far more fragile — stone that has been submerged for 2,000 years could crumble within hours if exposed to air or handled improperly.</p>
<p>'We need a plan that protects the site and advances the research at the same time,' Li said. 'Before that plan exists, keeping a lower profile is safer for the ruins.'</p>
<h2>The Three Questions I Cannot Stop Thinking About</h2>
<p>Since meeting Li, three questions about the Fuxian Lake ruins have been rattling around my head.</p>
<p>First: what was this city? The lost capital of the Dian Kingdom? An independent city-state erased from historical records? Or something from a civilization we have no name for?</p>
<p>Second: what do the symbols on the tablet mean? If it is a writing system, it would be one of the oldest underwater written artifacts ever found — not just in China, but anywhere. If it is only decorative or functional — why carve it on a stone tablet and place it 80 meters underwater, where no reader could ever see it?</p>
<p>Third — and this is the one that genuinely keeps me up: how much more is down there? The average depth of Fuxian Lake exceeds 80 meters. The deepest point exceeds 150 meters. According to Li, probably less than one-tenth of the total lakebed has been surveyed. In the cold, dark water below the reach of sunlight, there could be things waiting that we have not even begun to suspect.</p>
<h2>What Comes Next</h2>
<p>China's National Cultural Heritage Administration is reportedly considering adding the Fuxian Lake underwater site to its next batch of priority underwater archaeology initiatives. If approved, a large-scale joint archaeological expedition could launch by 2027 — using saturation diving techniques or manned submersibles to reach depths far beyond conventional diving limits.</p>
<p>Until then, the tablet symbols remain what they are: a question mark carved into stone, waiting in silent darkness, 80 meters below the surface of a lake in Yunnan. Whoever carved those marks — the person who, 2,000 years ago, pressed a tool into stone and left a message — has been gone for two millennia. But the marks survived. A small ROV, operated by curious humans on a boat overhead, found them in 2026.</p>
<p>If that is not a kind of poetry, I do not know what is.</p>"""
    },
    {
        "title": "Are We Alone in the Universe? The 2026 Scientific Progress Report",
        "category": "general",
        "excerpt": "From the Webb Telescope detecting biosignatures on a distant exoplanet to China's FAST radio telescope picking up unexplained signals, here is everything that happened in the search for alien life in 2026.",
        "image_keywords": "exoplanet discovery space telescope alien life search",
        "body_html": """<h2>The Fermi Paradox, 2026 Edition</h2>
<p>'Where is everybody?' That is the question physicist Enrico Fermi asked in 1950, and 76 years later, we still do not have a definitive answer. But we are closer than ever.</p>
<p>I have been following the search for extraterrestrial life for years — not because I believe in flying saucers, but because the scale of the question is staggering. There are roughly two trillion galaxies in the observable universe. Each galaxy averages about 100 billion stars. At least 20 percent of Sun-like stars host planets in the habitable zone. Even if the probability of intelligent life emerging is literally one in a trillion, the math says our galaxy should contain dozens of intelligent civilizations.</p>
<p>So where are they? In 2026, we got a few new clues.</p>
<h2>The Webb Telescope's Biggest Discovery</h2>
<p>In 2024, the James Webb Space Telescope detected dimethyl sulfide — DMS — in the atmospheric spectrum of exoplanet K2-18 b, located about 120 light-years away. This matters because, on Earth, DMS is produced almost exclusively by marine plankton. Finding it on another world could mean something is alive there.</p>
<p>Follow-up observations through late 2025 added more intriguing data: the methane and carbon dioxide ratios in K2-18 b's atmosphere do not look like normal chemical equilibrium. They look like the kind of chemical disequilibrium that, on Earth, we attribute to biological activity actively reshaping the atmosphere.</p>
<p>NASA's official position is 'exciting but requires more evidence'. The Webb telescope is scheduled for an extended observation campaign of K2-18 b starting in late 2026. If biosignatures are confirmed, it would be — without exaggeration — one of the most significant discoveries in human history.</p>
<h2>What Is China's FAST Telescope Actually Listening To?</h2>
<p>The Five-hundred-meter Aperture Spherical Telescope in Guizhou, China — FAST, or 'Sky Eye' — is the largest single-dish radio telescope on Earth. One of its missions is to search for narrowband radio signals from space that might indicate intelligent origin.</p>
<p>In 2025, FAST's internal bulletins flagged several 'candidate technosignatures' — signals with unusually narrow frequency bands, the kind that natural sources do not typically produce but that human technology creates all the time. After filtering out all known sources of interference — satellites, ground radar, aircraft communications — a few signals remained unaccounted for.</p>
<p>Before you get too excited: the most likely outcome, as with the famous 'Wow! Signal' of 1977, is that these represent some unknown natural radio phenomenon or an interference source that was not properly identified. But they have not been ruled out yet, and follow-up observations continue.</p>
<h2>Are We Using the Wrong Kind of Receiver?</h2>
<p>There is a hypothesis that genuinely bothers me: the 'signal time lag' problem. If an alien civilization broadcasts radio signals, those signals may take hundreds or thousands of years to reach Earth. During that time, the civilization that sent them may have evolved to use a completely different communication technology — just as humans transitioned from telegraph to internet in about 150 years.</p>
<p>This leads to a depressing possibility: the galaxy might be full of intelligent civilizations, but they all use communication methods we cannot detect. Neutrino communication. Gravitational wave modulation. Technologies we do not even have concepts for yet. We are like someone holding an AM radio next to a 5G tower, wondering why there is no signal. The signals are everywhere. We just do not have the right receiver.</p>
<h2>What Happens If We Are Not Alone?</h2>
<p>I sometimes try to imagine what would happen if tomorrow, NASA held a press conference and said 'we have confirmed evidence of extraterrestrial life'.</p>
<p>Honestly? Most people's daily lives would not change at all. The grocery store would not close. The subway would not stop running. You would still have to go to work the next day. But something deeper would shift — our definition of what it means to be human. Our fundamental narrative about our place in the cosmos. For thousands of years, humans believed we were unique, chosen, special. Confirming life on another world would shatter that. The shattering might be the most painful and most important growth moment in human history.</p>
<h2>What to Watch for in the Second Half of 2026</h2>
<p>If this topic interests you, here are the upcoming milestones worth paying attention to.</p>
<p>In July, the International Astronomical Union holds its exoplanet biosignatures symposium in Prague. New Webb telescope data on K2-18 b may be presented there.</p>
<p>In September, NASA's Europa Clipper arrives at Jupiter's moon Europa. Beneath Europa's icy crust is a liquid water ocean larger than all of Earth's oceans combined. This is widely considered the most promising place in our solar system to find existing extraterrestrial life — even if it is just microbial.</p>
<p>In October, China's Tianwen-2 mission launches toward a near-Earth asteroid for sample return. While not directly a life-detection mission, it will help us understand the organic chemistry environment of the early solar system — the conditions that gave rise to life here.</p>
<p>For me, the one I am most excited about is Europa Clipper. Finding even the simplest life in Europa's ocean would prove that life is not unique to Earth — that it emerges wherever conditions allow. That single discovery would be more consequential than finding a distant alien civilization, because it would answer Fermi's question not with words, but with evidence: we are not alone. And we never were.</p>"""
    },
]

def main():
    generated = []
    for i, data in enumerate(ARTICLES):
        slug = _gen_slug(data["title"])
        now = datetime.now()
        body = data["body_html"]
        text = re.sub(r'<[^>]+>', ' ', body)
        word_count = len(text.split())
        read_time = max(1, round(word_count / 200))

        article = {
            "title": data["title"],
            "slug": slug,
            "excerpt": data["excerpt"],
            "body_html": body,
            "image_keywords": data["image_keywords"],
            "word_count": word_count,
            "read_time_minutes": read_time,
            "date": now.strftime("%B %d, %Y"),
            "date_iso": now.strftime("%Y-%m-%d"),
            "category_name": "General",
            "category_emoji": "📰",
            "category_file": "category-general.html",
            "category_key": data.get("category", "general"),
        }

        cat_map = {
            "tech": ("Tech", "📱", "category-tech.html"),
            "food": ("Food", "🍽️", "category-food.html"),
            "travel": ("Travel", "✈️", "category-travel.html"),
            "general": ("General", "📰", "category-general.html"),
        }
        if data.get("category") in cat_map:
            cn, ce, cf = cat_map[data["category"]]
            article["category_name"] = cn
            article["category_emoji"] = ce
            article["category_file"] = cf

        html = build_full_page(article, SITE_KEY)
        filepath = BASE / f"{slug}.html"
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)
        generated.append(slug)
        print(f"  ✅ {slug}.html ({word_count} words, {read_time} min read)")

    print(f"\n🎉 Created {len(generated)} English articles!")
    return generated

def _gen_slug(title):
    slug = title.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug[:80].strip('-')
    if not slug:
        slug = "article"
    counter = 2
    base = slug
    while (BASE / f"{slug}.html").exists():
        slug = f"{base}-{counter}"
        counter += 1
    return slug

if __name__ == "__main__":
    main()
