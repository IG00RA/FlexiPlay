import './privacy-policy.css';
import { headers } from 'next/headers';

const PrivacyPolicy = async () => {
  const headersList = await headers();
  const domain = headersList.get('host') || 'mustage.site';
  return (
    <main className="privacy-policy">
      <h1>Zásady ochrany osobných údajov</h1>

      <section>
        <h2>1. Všeobecné informácie</h2>
        <p>
          Tieto Zásady ochrany osobných údajov určujú postup zberu, používania a
          uchovávania osobných údajov používateľov webovej stránky {domain}{' '}
          (ďalej len &quot;Webová stránka&quot;). Dodržiavame legislatívu
          Ukrajiny, najmä Zákon Ukrajiny &quot;O ochrane osobných údajov&quot;,
          ako aj medzinárodné štandardy, ako je GDPR.
        </p>
        <p>
          Prevádzkovateľom údajov je SPOLOČNOSŤ S RUČENÍM OBMEDZENÝM
          &laquo;PANKRATIIX GROUP&raquo;, ktorá je registrovaná na adrese:
          03194, Ukrajina, mesto Kyjev, Kolečová ulica, číslo 14d, kancelária
          610. So všetkými otázkami súvisiacimi so spracovaním osobných údajov
          sa obráťte na e-mailovú adresu:{' '}
          <a href="mailto:pankratiix.group@gmail.com">
            pankratiix.group@gmail.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2>2. Údaje, ktoré zhromažďujeme</h2>
        <h3>2.1. Prostredníctvom formulárov na stránke:</h3>
        <ul>
          <li>Meno používateľa</li>
          <li>Telefónne číslo</li>
          <li>Prezývka v Telegrame</li>
        </ul>
        <h3>2.2. Prostredníctvom Telegram bota:</h3>
        <ul>
          <li>Telegram ID</li>
          <li>Telefónne číslo</li>
          <li>Email (ak je dostupný)</li>
          <li>Zdroj prekliku (UTM značky reklamnej kampane)</li>
          <li>Užívateľské meno v Telegrame</li>
        </ul>
        <h3>2.3. Automaticky cez integrácie:</h3>
        <p>
          Dáta od Facebook Pixel, Google Analytics, Google Pixel, TikTok Pixel a
          ďalších analytických systémov.
        </p>
      </section>

      <section>
        <h2>3. Účely zberu údajov</h2>
        <ul>
          <li>
            Poskytovanie prístupu k vzdelávacím kurzom o arbitráži dopravy.
          </li>
          <li>Interakcia s používateľmi prostredníctvom Telegram bota.</li>
          <li>Analýza návštevnosti a optimalizácia reklamných kampaní.</li>
          <li>Marketingová komunikácia (s súhlasom používateľov).</li>
          <li>Zlepšovanie funkčnosti webovej stránky.</li>
        </ul>
      </section>

      <section>
        <h2>4. Prenos údajov tretím stranám</h2>
        <ul>
          <li>
            Analytické služby: Facebook Pixel, Google Analytics, Google Pixel,
            TikTok Pixel na analýzu návštevnosti a optimalizáciu reklamných
            kampaní.
          </li>
          <li>
            Partneri na spracovanie údajov: Výlučne na účely uvedené v týchto
            Zásadách.
          </li>
          <li>Právne záväzky: Ak to vyžaduje zákon.</li>
        </ul>
      </section>

      <section>
        <h2>5. Ochrana údajov</h2>
        <p>
          Prijímame všetky potrebné technické a organizačné opatrenia na ochranu
          vašich osobných údajov pred neoprávneným prístupom, stratou, zničením
          alebo zmenou. Medzi opatrenia patrí:
        </p>
        <ul>
          <li>Používanie šifrovania pri prenose údajov.</li>
          <li>Obmedzenie prístupu k údajom iba oprávneným zamestnancom.</li>
          <li>Pravidelné monitorovanie bezpečnostných systémov.</li>
        </ul>
      </section>

      <section>
        <h2>6. Doba uchovávania údajov</h2>
        <p>
          Vaše údaje sú uchovávané počas času potrebného na dosiahnutie účelov
          ich spracovania alebo do odvolania vášho súhlasu. Dáta z reklamných
          kampaní môžu byť uchovávané do 12 mesiacov.
        </p>
      </section>

      <section>
        <h2>7. Práva používateľov</h2>
        <ul>
          <li>
            Prístup k údajom: Môžete požiadať o kópiu svojich osobných údajov.
          </li>
          <li>Oprava: Môžete požadovať opravu nepresných údajov.</li>
          <li>
            Vymazanie: Môžete požiadať o vymazanie svojich údajov, ak to zákon
            umožňuje.
          </li>
          <li>
            Odvolanie súhlasu: Môžete odvolať svoj súhlas so spracovaním údajov.
          </li>
        </ul>
        <p>
          Na uplatnenie svojich práv kontaktujte nás na e-mailovej adrese:{' '}
          <a href="mailto:pankratiix.group@gmail.com">
            pankratiix.group@gmail.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2>8. Zmeny v zásadách ochrany osobných údajov</h2>
        <p>
          Tieto Zásady ochrany osobných údajov môžeme aktualizovať. Aktualizácie
          budú zverejňované na tejto stránke s uvedením dátumu posledných zmien.
          Odporúčame pravidelne kontrolovať túto stránku pre aktuálne
          informácie.
        </p>
      </section>

      <section>
        <h2>9. Kontakty</h2>
        <p>
          Ak máte otázky alebo pripomienky týkajúce sa týchto Zásad ochrany
          osobných údajov, kontaktujte nás na adrese:{' '}
          <a href="mailto:pankratiix.group@gmail.com">
            pankratiix.group@gmail.com
          </a>
          , <a href="tel:+380954276657">+380 (95) 427-66-57</a>.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
