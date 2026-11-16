import { useState } from "react";
import SchemeCard from "../components/SchemeCard";

function Schemes() {
  const schemes = [
    {
      name: "PM-KISAN Samman Nidhi",
      category: "Income Support",
      icon: "🌾",
      benefit: "₹6,000 per year in three equal instalments of ₹2,000.",
      description:
        "Direct income support for eligible landholding farmer families across India.",
      eligibility:
        "Landholding farmer families with cultivable land recorded in their names, subject to the scheme's exclusion rules.",
      documents: [
        "Aadhaar details",
        "Land ownership records",
        "Bank account details",
        "Aadhaar-linked mobile number for e-KYC",
      ],
      application:
        "Register through the official PM-KISAN portal and complete the required verification and e-KYC.",
      officialUrl: "https://pmkisan.gov.in/",
      officialLabel: "PM-KISAN Official Portal",
      tag: "CENTRAL GOVERNMENT SCHEME",
    },
    {
      name: "PM Fasal Bima Yojana",
      category: "Crop Insurance",
      icon: "🛡️",
      benefit:
        "Crop insurance against specified natural risks, subject to notified crops and scheme conditions.",
      description:
        "Insurance protection for eligible farmers against specified crop losses and agricultural risks.",
      eligibility:
        "Farmers growing notified crops in notified areas during the relevant season, subject to current scheme rules.",
      documents: [
        "Aadhaar or other accepted identity proof",
        "Land records or valid cultivation/tenancy proof",
        "Bank account details",
        "Sowing declaration and crop details",
      ],
      application:
        "Use the official Farmer Corner to register and apply for crop insurance. Availability and deadlines depend on the state, crop and season.",
      officialUrl: "https://pmfby.gov.in/",
      officialLabel: "PMFBY Official Portal",
      tag: "CROP PROTECTION",
    },
    {
      name: "Kisan Credit Card (KCC)",
      category: "Agricultural Credit",
      icon: "🏦",
      benefit:
        "Timely institutional credit for eligible cultivation and allied agricultural needs.",
      description:
        "A credit facility designed to help farmers meet cultivation expenses and other eligible farming requirements.",
      eligibility:
        "Owner cultivators, joint borrowers, tenant farmers, oral lessees, sharecroppers and eligible farmer groups, subject to bank rules.",
      documents: [
        "Completed application form",
        "Identity and address proof",
        "Landholding or cultivation proof, as applicable",
        "Passport-size photographs",
        "Bank-specific supporting documents",
      ],
      application:
        "Apply through a participating bank's official website or branch. The bank assesses the application and applicable credit limit.",
      officialUrl: "https://www.myscheme.gov.in/schemes/kcc",
      officialLabel: "KCC Scheme Details",
      tag: "AGRICULTURAL CREDIT",
    },
    {
      name: "Pradhan Mantri Krishi Sinchai Yojana",
      category: "Irrigation Support",
      icon: "💧",
      benefit: "Support for improving irrigation access and water-use efficiency through eligible programme components.",
      description: "A programme focused on expanding irrigation coverage and promoting efficient water management.",
      eligibility: "Eligibility depends on the specific component, state implementation and applicable guidelines.",
      documents: ["Identity proof", "Land or cultivation records, where required", "Bank details", "Application-specific documents"],
      application: "Check current component availability and application procedures with your state agriculture or irrigation department.",
      officialUrl: "https://pmksy.gov.in/",
      officialLabel: "PMKSY Official Portal",
      tag: "IRRIGATION SUPPORT",
    },
    {
      name: "Soil Health Card Scheme",
      category: "Soil Health",
      icon: "🌱",
      benefit: "Soil testing information and recommendations to help farmers manage nutrients and soil health.",
      description: "Helps farmers understand the nutrient status of their soil and make informed fertiliser decisions.",
      eligibility: "Farmers can approach their local agriculture department or soil testing facility for information about soil sampling.",
      documents: ["Farmer details", "Land or field details", "Contact information"],
      application: "Contact your local agriculture office or soil testing laboratory to ask about soil sampling and card availability.",
      officialUrl: "https://soilhealth.dac.gov.in/",
      officialLabel: "Soil Health Card Portal",
      tag: "SOIL MANAGEMENT",
    },
    {
      name: "Agriculture Infrastructure Fund",
      category: "Infrastructure Finance",
      icon: "🏗️",
      benefit: "Financing support for eligible post-harvest management and community farming infrastructure projects.",
      description: "Supports investment in facilities such as warehouses, cold storage and other eligible agricultural infrastructure.",
      eligibility: "Eligible applicants and projects are defined by the scheme guidelines and participating lending institutions.",
      documents: ["Applicant identity and address proof", "Project proposal", "Land or facility documents, where applicable", "Financial and bank documents"],
      application: "Review the official guidelines and apply through the Agriculture Infrastructure Fund portal or a participating lender.",
      officialUrl: "https://agriinfra.dac.gov.in/",
      officialLabel: "Agriculture Infrastructure Fund Portal",
      tag: "INFRASTRUCTURE FINANCE",
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Income Support",
    "Crop Insurance",
    "Agricultural Credit",
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(search.toLowerCase()) ||
      scheme.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || scheme.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="schemes-page govt-schemes-page">
      <section className="schemes-hero">
        <div className="schemes-hero-content">
          <span className="schemes-eyebrow">
            FARMER WELFARE & GOVERNMENT SUPPORT
          </span>
          <h1>
            Government Schemes
            <span> for Farmers.</span>
          </h1>
          <p>
            Explore financial assistance, crop insurance and agricultural
            credit programmes. Understand the benefits, eligibility and
            application process before applying.
          </p>
          <div className="schemes-hero-note">
            <span>🏛️</span>
            <span>Explore. Understand. Apply through official channels.</span>
          </div>
        </div>

        <div className="schemes-hero-visual">
          <div className="schemes-visual-icon">🌾</div>
          <h3>Support for Indian Farmers</h3>
          <p>Reliable scheme information in one place.</p>
        </div>
      </section>

      <section className="govt-scheme-intro">
        <div>
          <span className="govt-section-label">SCHEME DIRECTORY</span>
          <h2>Explore Farmer Welfare Schemes</h2>
          <p>
            Compare the purpose, benefits and basic eligibility of popular
            government programmes.
          </p>
        </div>
        <span className="govt-scheme-total">
          {schemes.length} Featured Schemes
        </span>
      </section>

      <section className="govt-filter-section">
        <div className="govt-search-box">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search schemes by name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <button onClick={() => setSearch("")}>Clear</button>
          )}
        </div>

        <div className="govt-filter-buttons">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="govt-filter-count">
          Showing {filteredSchemes.length} of {schemes.length} schemes
        </p>
      </section>

      <section className="govt-scheme-directory">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.name}
              scheme={scheme}
              number={schemes.indexOf(scheme) + 1}
            />
          ))
        ) : (
          <div className="govt-no-results">
            <span>🔎</span>
            <h3>No schemes found</h3>
            <p>Try another search term or select a different category.</p>
            <button onClick={() => {
              setSearch("");
              setCategory("All");
            }}>
              Clear all filters
            </button>
          </div>
        )}
      </section>

      <section className="govt-scheme-help">
        <div>
          <span>IMPORTANT INFORMATION</span>
          <h2>Check the latest rules before applying.</h2>
          <p>
            Eligibility, documents, notified crops and application dates can
            change. Always confirm the latest requirements on the official
            scheme portal or with the implementing bank or department.
          </p>
        </div>
        <span className="govt-help-icon">📋</span>
      </section>

      <p className="govt-scheme-disclaimer">
        KisanMitra is an independent informational platform and is not a
        government website. It does not approve applications or guarantee
        scheme benefits. Final eligibility and approval are determined by
        the relevant government department or financial institution.
      </p>
    </main>
  );
}

export default Schemes;
