import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 px-4 py-12 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">Terms &amp; Conditions</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">1. Introduction</h2>
            <p>This website provides a local directory of shops and services to help users discover nearby businesses. By accessing or using this website, you agree to comply with these Terms &amp; Conditions.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">2. Data Sources</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Shop information is collected from publicly available sources, including OpenStreetMap (OSM) via Overpass Turbo.</li>
              <li>Additional information may be collected through manual verification and user submissions.</li>
              <li>Proper attribution is given to OpenStreetMap contributors under the ODbL 1.0 license.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">3. Verified Listings (Green Tick)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Shops marked with a green tick indicate that the listing has been manually reviewed or verified.</li>
              <li>Verification may include checking the existence, category, or basic details of the shop.</li>
              <li>Verification does not guarantee permanent accuracy, as business details may change over time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">4. Accuracy of Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Efforts are made to maintain accurate and up-to-date information.</li>
              <li>However, this website does not guarantee the completeness, reliability, or accuracy of any listing.</li>
              <li>Users are encouraged to verify details independently before making decisions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">5. User Submissions (Add / Update Shops)</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Users may submit shop details or request updates through the provided form.</li>
              <li>All submissions are subject to review before being published.</li>
              <li>The website reserves the right to accept, modify, or reject submissions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">6. Reporting Incorrect Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Users can report incorrect or outdated information (such as wrong address, contact details, or closed shops) using the provided form.</li>
              <li>Reported issues will be reviewed and updated where necessary.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">7. Independent Platform</h2>
            <p>This website operates as an independent directory and is not officially affiliated with any listed businesses.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">8. Limitation of Liability</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>The website is not responsible for any loss, inconvenience, or damage arising from the use of information provided.</li>
              <li>All use of the website is at the user's own discretion.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">9. Changes to Terms</h2>
            <p>These Terms &amp; Conditions may be updated at any time without prior notice.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">10. Acceptance of Terms</h2>
            <p>By using this website, you agree to these Terms &amp; Conditions.</p>
          </section>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
