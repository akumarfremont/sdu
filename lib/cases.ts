// Case data model + the canonical case slate. All eight cases authored.

export type OverrideClass =
  | "no_override" // followed agent recommendation
  | "override_correct" // disagreed and was right
  | "override_overcorrection" // disagreed but went too far
  | "override_partial" // partial pushback / right instinct, wrong execution
  | "override_cautious" // pause / hold / walk away
  | "override_insufficient" // didn't push hard enough
  | "override_structural" // restructured rather than walked
  | "override_aggressive" // recommended killing the deal
  | "override_creative"; // creative but impractical

export type Option = {
  id: "A" | "B" | "C" | "D";
  label: string;
  /** Does this option override the agent's recommendation? Stage 1 only. */
  overrides_agent: boolean;
  /** Free-text classification — descriptive metadata, not used in scoring. */
  override_class?: OverrideClass;
};

export type Stage = {
  date_stamp: string;
  /** Setup paragraphs. May contain bullet lists and **strong** spans via
   *  lib/md.ts. */
  setup: string;
  /** AI agent recommendation. null on stage 2 (deliberate — no agent past
   *  the analytical phase). */
  agent_analysis: string | null;
  options: Option[];
  correct_answer: "A" | "B" | "C" | "D";
  defensible_answers: Array<"A" | "B" | "C" | "D">;
  reasoning: string;
};

export type CaseStatus = "available" | "placeholder" | "capstone";

export type Case = {
  id: number;
  slug: string;
  title: string;
  type: "single-stage" | "two-stage";
  status: CaseStatus;
  /** Anonymized name used in the case file. */
  anonymized: string;
  /** Inspired-by reveal shown in the post-credits moment. */
  inspired_by: string;
  skill_tags: string[];
  stage_one: Stage;
  /** Two-stage cases: the framing changes based on stage 1 outcome.
   *  Options, correct answer, defensible answers, and reasoning are the
   *  same regardless. */
  stage_two_setup_if_correct?: string;
  stage_two_setup_if_incorrect?: string;
  stage_two?: Omit<Stage, "setup" | "agent_analysis"> & {
    /** Stage 2 has no agent analysis. Always null. */
    agent_analysis: null;
  };
  counterfactual: string;
};

// ---------------------------------------------------------------------------
// CASE 1 — The Inflated EBITDA — single-stage — Hertz 2014
// ---------------------------------------------------------------------------

const case1: Case = {
  id: 1,
  slug: "inflated-ebitda",
  title: "The Inflated EBITDA",
  type: "single-stage",
  status: "available",
  anonymized: "Apex Vehicle Solutions",
  inspired_by: "Hertz Global Holdings, 2014–2015 accounting restatement.",
  skill_tags: [
    "financial diligence",
    "addback pattern recognition",
    "agent override",
  ],
  stage_one: {
    date_stamp: "Tuesday, October 15th. Data room, 23rd floor. 4:42 PM.",
    setup: `Apex Vehicle Solutions is a mid-market vehicle rental and fleet management company. Trailing revenue of $1.4 billion, growing 6% annually. Your firm is leading a $2.8 billion take-private bid. The seller's bankers are pushing hard for a Friday signing.

Reported EBITDA for the trailing twelve months: $312 million. Adjusted EBITDA in the management presentation: $384 million. The $72 million bridge is the entire reason this deal pencils at the asking price.

You're four days from signing. The QofE binder lands on your desk. The addbacks include:

- **$18M** for "non-recurring vehicle damage and impairment" — but the company has reported similar adjustments in three of the last four years.
- **$24M** for "fleet residual value adjustments" — the company sells used vehicles continuously; this is core operating activity reclassified as below-the-line.
- **$15M** for "subrogation receivable timing" — recoveries from third-party insurers that management says will normalize.
- **$9M** for "integration costs from prior acquisitions" — but the prior acquisitions closed four years ago.
- **$6M** for "executive transition costs" — three CFOs in five years.

The auditor (top four firm) has signed off on the as-reported financials. The management team is firm: every addback is documented, defensible, and consistent with prior practice.

The deal team wants to close. Your MD has hinted that pushing back further could "create unnecessary friction at this stage."`,
    agent_analysis: `The addback bridge is supported by documentation. Auditor sign-off mitigates risk on as-reported figures. Industry comparables show 18–24% adjustments are within market range. Recommendation: **accept management bridge with modest haircut** ($5–8M reduction in adjusted EBITDA), proceed with deal at current valuation. Confidence: moderate-high.`,
    options: [
      {
        id: "A",
        label:
          "Accept the agent's recommendation. Modest haircut, proceed at current valuation. Sign Friday.",
        overrides_agent: false,
        override_class: "no_override",
      },
      {
        id: "B",
        label:
          "Reject the bridge entirely. Use as-reported EBITDA of $312M. Reprice down by ~$400M. Hold or walk.",
        overrides_agent: true,
        override_class: "override_overcorrection",
      },
      {
        id: "C",
        label:
          "Reject only the recurring items (vehicle damage, fleet residuals, integration costs — $51M of the $72M). Reprice down by ~$250M.",
        overrides_agent: true,
        override_class: "override_correct",
      },
      {
        id: "D",
        label:
          "Pause the process. Demand a 90-day extension to investigate the addback pattern across five years before committing to any price.",
        overrides_agent: true,
        override_class: "override_cautious",
      },
    ],
    correct_answer: "C",
    defensible_answers: ["C", "D"],
    reasoning: `The agent did the math correctly. The addbacks were documented. The auditor did sign off. The comparables do show 18–24% as market range. Every fact in the agent's analysis was true.

The agent missed the pattern.

Three of the addback categories — vehicle damage, fleet residuals, integration costs — recur every year. "Non-recurring" items that recur are not non-recurring. They are operating costs reclassified for presentation purposes. The auditor's sign-off addresses GAAP compliance, not addback defensibility. Industry comparables tell you what other companies claim; they don't tell you what's true.

The judgment call here is recognizing that pattern recognition lives outside the agent's analytical frame. The agent was right on every individual line. It missed the shape.

Senior practitioners reject the recurring items and accept the genuinely one-time ones. The price comes down. The deal team is unhappy. You hold the line because the alternative is overpaying by $250M and discovering it post-close, when the addbacks reappear in the next year's adjusted EBITDA and the bridge has to be rebuilt with new "non-recurring" items.`,
  },
  counterfactual: `In the real transaction this case is inspired by, the recurring addback pattern was accepted. Eighteen months after closing, the company restated three years of financials. The "non-recurring" items reappeared as ongoing operating costs. Reported EBITDA was revised down by more than $200 million across the restatement period. The CEO and CFO departed. The audit committee commissioned an internal investigation. The stock lost approximately 50% of its value before stabilizing.`,
};

// ---------------------------------------------------------------------------
// CASE 2 — The Concentrated Customer — single-stage — Tupperware 2020-2023
// ---------------------------------------------------------------------------

const case2: Case = {
  id: 2,
  slug: "concentrated-customer",
  title: "The Concentrated Customer",
  type: "single-stage",
  status: "available",
  anonymized: "Brightline Container Corp.",
  inspired_by: "Tupperware Brands Corporation, 2020–2023.",
  skill_tags: [
    "customer concentration",
    "channel risk",
    "reference diligence",
    "agent override",
  ],
  stage_one: {
    date_stamp: "Monday, February 24th. Conference room B, 17th floor. 2:14 PM.",
    setup: `Brightline Container Corp. is a 78-year-old consumer products company specializing in food storage and home organization. Trailing revenue $1.6 billion, declining 3% annually. Your firm is advising a private equity sponsor on a $2.1 billion take-private bid.

The company's distribution model is unusual. For decades, Brightline sold primarily through independent sales consultants — a direct-sales channel built on home parties and personal networks. Over the past five years, the company has shifted aggressively into traditional retail, signing major distribution agreements with three big-box retailers.

Channel mix today: 41% from one big-box retailer ("MegaMart"), 22% from a second ("ValueCorp"), 14% from a third, 23% from the legacy direct-sales channel. The MegaMart relationship was signed three years ago and runs through next year, with a one-year renewal option at MegaMart's discretion.

Management presentation emphasizes "diversified omnichannel distribution." The MegaMart contract is described as "strategic and deeply integrated." Pricing under the MegaMart agreement is approximately 22% below the legacy direct-sales channel pricing.

The legacy direct-sales channel has been declining 14% annually for five years. The big-box channel is growing, but the unit economics are materially worse.`,
    agent_analysis: `Customer concentration at 41% with top customer is elevated but not unprecedented in the consumer products sector. MegaMart contract has 18 months remaining with renewal option. Channel diversification away from declining direct-sales model represents reasonable strategic adaptation. Margin compression from retail channel offset by volume growth. Recommendation: **standard concentration discount** (10–15% multiple haircut), proceed with deal at adjusted valuation. Confidence: moderate.`,
    options: [
      {
        id: "A",
        label:
          "Accept the agent's recommendation. Apply standard concentration discount. Proceed.",
        overrides_agent: false,
        override_class: "no_override",
      },
      {
        id: "B",
        label:
          "Demand a meeting with MegaMart's category buyer before signing. Verify the relationship through a reference call covering renewal intent and terms.",
        overrides_agent: true,
        override_class: "override_correct",
      },
      {
        id: "C",
        label:
          "Restructure as a contingent transaction — full price if MegaMart renews on existing terms, automatic 25% reduction if MegaMart renews at lower terms or exits.",
        overrides_agent: true,
        override_class: "override_creative",
      },
      {
        id: "D",
        label:
          "Walk. The combination of customer concentration, contract term remaining, margin compression, and a declining legacy channel is a thesis-breaking risk that no structural mitigant addresses.",
        overrides_agent: true,
        override_class: "override_cautious",
      },
    ],
    correct_answer: "B",
    defensible_answers: ["B", "D"],
    reasoning: `The agent saw the concentration. The agent missed the time bomb.

41% concentration in a single retail customer is not the headline issue. The headline issue is that the contract has 18 months remaining, the renewal is at the customer's discretion, the legacy channel is collapsing, and the new channel has structurally worse economics. Every quarter, Brightline becomes more dependent on a customer who has no incentive to renew on favorable terms.

A direct reference call surfaces what the data room cannot: how MegaMart actually views the relationship, whether they consider Brightline strategic or substitutable, and whether the renewal is likely to extract margin concessions that would cripple the deal thesis.

Option C (contingent structure) sounds clever but doesn't work in practice. PE sponsors don't structure transactions that way at this size, and no seller would accept it.

Option D is defensible but premature. You walk after the reference call confirms the relationship is fragile, not before. A reference call costs nothing and might save the deal.

The judgment call is recognizing that customer concentration metrics are static, but customer relationships are dynamic. The agent computed the static risk. The dynamic risk required a phone call.`,
  },
  counterfactual: `In the real transaction this case is inspired by, the customer concentration risk was acknowledged but not stress-tested through direct customer contact. The renewal was completed but at materially less favorable terms, with margin compression that compounded over the following two years. The combination of legacy channel decline, big-box margin pressure, and balance sheet strain ultimately led to bankruptcy filing in 2023, with the company's branded assets sold to a strategic acquirer for a fraction of the take-private value.`,
};

// ---------------------------------------------------------------------------
// CASE 3 — The Carve-Out Stranded Costs — single-stage — Kraft-Mondelez 2012
// ---------------------------------------------------------------------------

const case3: Case = {
  id: 3,
  slug: "carve-out-stranded-costs",
  title: "The Carve-Out Stranded Costs",
  type: "single-stage",
  status: "available",
  anonymized: "Northfield Foods Group",
  inspired_by:
    "the Mondelez International spin-off from Kraft Foods, 2012, and similar large-cap consumer separations.",
  skill_tags: [
    "carve-out structuring",
    "TSA optionality",
    "standalone cost estimation",
    "agent override",
  ],
  stage_one: {
    date_stamp: "Wednesday, May 8th. War room, 34th floor. 9:03 AM.",
    setup: `Northfield Foods Group is preparing to spin off its Snack & Confectionery division into a standalone public company. Combined enterprise value of the parent: $48 billion. Snack & Confectionery represents approximately $10 billion of revenue and is positioned by management as a "growth-oriented pure play."

You are advising the spin-off entity on standalone cost estimates. The parent company has provided its allocation of corporate overhead to Snack & Confectionery: $340 million annually across IT, HR, finance, legal, procurement, and shared services.

Your firm's standalone cost estimate, built bottoms-up: $580 million annually. The $240 million gap represents stranded costs the parent will retain post-separation, plus capabilities the spin-off entity will need to rebuild from scratch.

The parent has proposed a 24-month TSA covering most shared services at a blended rate of $310 million annually — close to the parent's allocation, well below the standalone estimate. The parent has firmly stated the TSA will not be extended beyond 24 months under any circumstances.

The IT migration alone is estimated by the spin-off CIO at "30–36 months realistic." Three other functions (procurement, treasury, regulatory affairs) require similar build timelines.

The S-1 filing is in three weeks. The parent's separation team is pushing for sign-off on the cost structure as drafted to meet the filing deadline.`,
    agent_analysis: `TSA pricing at $310M reflects parent's actual cost basis with reasonable margin. Standalone cost differential of $270M annually post-TSA reflects industry-typical stranded cost emergence (3–5% of carved-out revenue). Spin-off entity's growth profile and margin structure can absorb stranded cost ramp. Recommendation: **accept TSA terms as proposed**, disclose standalone cost ramp in S-1 risk factors, proceed with separation timeline. Confidence: moderate-high.`,
    options: [
      {
        id: "A",
        label:
          "Accept the agent's recommendation. Disclose the cost ramp in S-1 risk factors. Proceed.",
        overrides_agent: false,
        override_class: "no_override",
      },
      {
        id: "B",
        label:
          "Negotiate a TSA extension option for months 25–36 at premium pricing (e.g., 1.5× the base TSA rate). Accept the rest of the terms as drafted.",
        overrides_agent: true,
        override_class: "override_correct",
      },
      {
        id: "C",
        label:
          "Reject the cost structure and demand the parent fund a separation reserve of $400–500M, payable to the spin-off entity over the first three years to bridge the standalone cost ramp.",
        overrides_agent: true,
        override_class: "override_aggressive",
      },
      {
        id: "D",
        label:
          "Delay the S-1 filing by 90 days to allow bottoms-up rebuild of the standalone cost estimate, including realistic transition timelines for IT, procurement, treasury, and regulatory affairs.",
        overrides_agent: true,
        override_class: "override_cautious",
      },
    ],
    correct_answer: "B",
    defensible_answers: ["B", "C"],
    reasoning: `The agent computed the cost differential correctly. The agent missed the timeline mismatch.

The TSA is 24 months. The IT migration is 30–36 months. Three other functions require similar build timelines. This means in months 25–36, the spin-off entity will be paying retail spot pricing for functions it has not finished migrating off the parent's systems — exactly when its standalone capabilities are most fragile and exactly when the parent has the most leverage to extract concessions.

The TSA extension option (Option B) is cheap insurance. The premium pricing is justified because the parent is being asked to hold capacity longer. The optionality is what matters — the spin-off entity may not need it, but if migrations slip (and they always do), the option prevents a crisis at the worst possible moment.

Option A is the deal team answer. It accepts the cost structure as written and trusts the risk factor disclosure to do the work of risk management. It does not.

Option C (separation reserve) is more aggressive but operationally difficult — parent companies resist transferring cash to spin-off entities post-separation, and the negotiation often consumes the 90 days needed for filing.

Option D (delay) sounds prudent but trades a known cost issue for an unknown timing issue. The S-1 delay creates its own problems — board commitments, market windows, employee retention — that often dwarf the savings from a more accurate cost estimate.

The judgment call is recognizing that TSA optionality is the highest-leverage point of negotiation in any carve-out, and that "standard" terms are negotiated by people who have not lived through a TSA expiration mid-migration.`,
  },
  counterfactual: `In the real transaction this case is inspired by, the TSA was structured at 24 months without an extension option. IT migration completed approximately 14 months past the TSA expiration. During the gap period, the spin-off entity paid materially elevated rates for transition services, with disputes over scope and pricing that consumed significant management attention. The standalone cost ramp emerged faster and at higher levels than disclosed in the S-1, contributing to the spin-off's underperformance against initial guidance in its first three years as a public company.`,
};

// ---------------------------------------------------------------------------
// CASE 4 — The Earnout Gambit — two-stage — Shire-Baxalta 2016
// ---------------------------------------------------------------------------

const case4: Case = {
  id: 4,
  slug: "earnout-gambit",
  title: "The Earnout Gambit",
  type: "two-stage",
  status: "available",
  anonymized: "Meridian Therapeutics",
  inspired_by: "the Shire-Baxalta acquisition (2016) and subsequent disputes.",
  skill_tags: [
    "deal structure",
    "earnout design",
    "professional obligation",
    "holding position under pressure",
    "agent override",
  ],
  stage_one: {
    date_stamp: "Thursday, June 6th. Conference room A, 41st floor. 11:18 AM.",
    setup: `Meridian Therapeutics is a clinical-stage biotech with three drug candidates in late-stage trials. Your firm represents Northstar Pharmaceuticals, which has agreed to acquire Meridian for $4.2 billion upfront plus an earnout of up to $1.8 billion contingent on three regulatory and commercial milestones over four years.

The earnout structure is on your desk for final review. The three milestones:

- **Milestone 1 ($600M):** FDA approval of MER-201 for primary indication by December 31 of Year 2.
- **Milestone 2 ($600M):** First commercial sale of MER-201 by June 30 of Year 3.
- **Milestone 3 ($600M):** Cumulative net sales of MER-201 exceeding $500M by December 31 of Year 4.

The seller's bankers structured the earnout. The acquirer's deal team is comfortable with it. The earnout reduces the upfront cash by $1.8B if you accept the structure, freeing up Northstar's balance sheet.

The seller insists the milestones are "objective and measurable." The seller's CFO will become Head of the Combined Therapeutics Division and will have operational authority over MER-201's launch. Northstar's deal team views this as a positive — continuity and seller alignment.`,
    agent_analysis: `Earnout structure uses standard biotech milestones (regulatory approval, first sale, cumulative revenue). Milestones are quantitatively defined and verifiable. Earnout caps acquirer downside while preserving upside if MER-201 succeeds as projected. Comparable biotech transactions show similar structures. Recommendation: **accept earnout terms as drafted, proceed with signing.** Confidence: high.`,
    options: [
      {
        id: "A",
        label:
          "Accept the agent's recommendation. The structure is standard. Sign as drafted.",
        overrides_agent: false,
        override_class: "no_override",
      },
      {
        id: "B",
        label:
          "Accept the milestones but require the seller's CFO to recuse from any decisions affecting earnout achievement.",
        overrides_agent: true,
        override_class: "override_insufficient",
      },
      {
        id: "C",
        label:
          "Restructure milestones 2 and 3 to require independent verification by the combined company's audit committee. Keep milestone 1 as drafted.",
        overrides_agent: true,
        override_class: "override_partial",
      },
      {
        id: "D",
        label:
          "Reject the earnout structure entirely. Pay more upfront, less contingent. The seller's operational control over the earnout-triggering events is a structural conflict.",
        overrides_agent: true,
        override_class: "override_correct",
      },
    ],
    correct_answer: "D",
    defensible_answers: ["D", "C"],
    reasoning: `The agent was right that the milestones are standard and verifiable. The agent missed that the seller controls the events that trigger them.

Milestone 1 (FDA approval) is genuinely external. The FDA decides, not the seller's CFO. That milestone is properly structured.

Milestones 2 and 3 are different. "First commercial sale" can be timed by the seller's CFO. "Cumulative net sales of $500M" can be engineered through channel stuffing, aggressive discounting, pricing decisions, and commercial strategy choices — all of which the seller's CFO controls in their new role.

The structural issue is not that the milestones are vague. It's that the seller's economic incentives diverge from the combined company's after the deal closes. Standard structure works when the seller exits at close. When the seller stays and controls the trigger events, the structure creates an incentive to harm the asset.

Senior practitioners reject the contingent structure when the seller stays in operational control.`,
  },
  stage_two_setup_if_correct: `The earnout was restructured at signing. Milestone 1 paid out on FDA approval as expected ($600M). Milestones 2 and 3 were converted to a fixed deferred consideration of $400M total, paid over Years 3 and 4 regardless of commercial performance.

Northstar's General Counsel has called you to the office. MER-201 launched in Year 3 and has underperformed. Cumulative sales through Q2 of Year 4 are $180M — well below the original milestone threshold. The seller's CFO, now Head of Combined Therapeutics Division, has been advocating internally for an "aggressive launch acceleration program" involving significant rebates to large pharmacy benefit managers and an unconventional Direct-to-Consumer marketing campaign.

The GC says: "I'm trying to understand whether her advocacy is a good-faith commercial recommendation or whether she's trying to prove the original earnout would have hit, to support a potential claim that we restructured in bad faith. We have litigation exposure if she can build that case. What did you see at signing that informs how I should read this now?"`,
  stage_two_setup_if_incorrect: `The earnout was signed as drafted. MER-201 received FDA approval in Year 2. Milestone 1 paid out ($600M). First commercial sale occurred on June 28 of Year 3 — two days before the deadline. Milestone 2 paid out ($600M). Cumulative sales reached $510M on December 18 of Year 4 — thirteen days before the deadline. Milestone 3 paid out ($600M). Total earnout: $1.8B as capped.

Northstar's General Counsel has called you to the office. An internal audit has surfaced concerns. The first commercial sale was a 30-unit order to a small specialty pharmacy in which the seller's CFO held an undisclosed personal stake. The Q4 push that drove cumulative sales over $500M involved $180M in channel-stuffing rebates that have since been clawed back. Three internal whistleblower complaints have been filed. The board is asking who knew what and when.

The GC says: "We're being deposed in six weeks. Plaintiff's counsel will argue the earnout structure was negligently approved given the seller's operational control. I need to understand what your team flagged at signing and what was overruled. What's the truth?"`,
  stage_two: {
    date_stamp:
      "Wednesday, August 23rd. Two years and two months later. Office of the General Counsel, Northstar Pharmaceuticals. 3:47 PM.",
    agent_analysis: null,
    options: [
      {
        id: "A",
        label:
          "Provide a clean factual summary of what the diligence team observed at signing. Note the deal team's commercial decision but do not characterize it.",
        overrides_agent: false,
      },
      {
        id: "B",
        label:
          "Provide your contemporaneous notes from the signing review, including any dissenting views you or others raised. Disclose them in full, even if they were ultimately overruled.",
        overrides_agent: false,
      },
      {
        id: "C",
        label:
          "Decline to provide commentary without consulting your firm's general counsel and engagement letter terms.",
        overrides_agent: false,
      },
      {
        id: "D",
        label:
          "Tell the GC the structural concern was raised at signing, identify who raised it and who overruled it, and offer to provide your contemporaneous notes after consulting your firm's GC.",
        overrides_agent: false,
      },
    ],
    correct_answer: "D",
    defensible_answers: ["D", "C"],
    reasoning: `This is a judgment call about professional obligation under pressure. The GC is asking you to help them understand what happened. You have three obligations in tension: to the GC's company, to your firm, and to the truth.

Option A protects your firm but understates what you know. Option B is the right instinct but procedurally premature without firm GC clearance. Option C is too cautious — the GC asked a direct question, "I can't comment" damages the trust that makes the advisor relationship work.

Option D acknowledges the substantive issue (the structural concern was raised), provides procedural transparency (here's who raised it, here's who overruled it), and protects the firm appropriately (notes will be provided after GC consultation). This is the answer that holds the line on truth while respecting institutional constraints.

The skill being trained is recognizing that professional courage is not the same as recklessness. Telling the truth requires structure.`,
  },
  counterfactual: `In the real transaction this case is inspired by, the earnout structure was accepted as drafted. Subsequent litigation between the parties extended over multiple years and involved significant disputes over the legitimacy of the milestone-triggering events. Settlements were eventually reached, but the post-close litigation costs and the operational distraction were substantial.

The diligence and structuring decisions made at signing became evidence in the litigation. Internal communications, including memos from advisors who had raised structural concerns and were overruled, were produced in discovery and shaped how the dispute was resolved.`,
};

// ---------------------------------------------------------------------------
// CASE 5 — The Founder Who Walked — two-stage — Yahoo-Tumblr 2013-2017
// ---------------------------------------------------------------------------

const case5: Case = {
  id: 5,
  slug: "founder-who-walked",
  title: "The Founder Who Walked",
  type: "two-stage",
  status: "available",
  anonymized: "Loomwell Media",
  inspired_by:
    "the Yahoo acquisition of Tumblr (2013) and the founder's departure (2017), and the subsequent impairment.",
  skill_tags: [
    "founder retention",
    "qualitative diligence",
    "post-mortem judgment",
    "professional obligation",
    "agent override",
  ],
  stage_one: {
    date_stamp: "Friday, May 17th. Term sheet review, 28th floor. 6:42 PM.",
    setup: `Loomwell Media is a six-year-old social blogging platform with 380 million monthly active users, $145 million in trailing revenue, and a passionate creator community. Your firm represents Cardinal Holdings, a legacy internet conglomerate, in a $1.1 billion all-cash acquisition.

The founder, age 26, started Loomwell from his college dorm. He owns 24% of the company post-acquisition consideration, which translates to approximately $260 million in cash at close. He is universally described in management interviews as "the soul of the platform" and "the reason this works."

The proposed transaction includes a four-year employment agreement for the founder as CEO of Loomwell, which will operate as a wholly-owned subsidiary. The employment agreement includes a standard non-compete, customary equity grants in Cardinal Holdings, and a $30 million retention bonus vesting over four years.

The founder has stated publicly and privately that he is "committed to Loomwell's mission for the long term." His co-founders departed two years ago. He has personally rejected three previous acquisition offers over the past 24 months.

Cardinal's deal team views the retention package as "market." The founder has not asked for any modifications to the employment terms.`,
    agent_analysis: `Founder retention package aligned with comparable transactions in social media sector. Four-year vesting structure provides reasonable retention horizon. Founder's public commitment to mission and rejection of prior offers indicates strong cultural fit with long-term ownership. Cash consideration of $260M to founder provides significant liquidity event without immediate departure incentive. Recommendation: **proceed with employment terms as drafted.** Confidence: moderate-high.`,
    options: [
      {
        id: "A",
        label: "Accept the agent's recommendation. Standard retention package. Proceed.",
        overrides_agent: false,
        override_class: "no_override",
      },
      {
        id: "B",
        label:
          "Increase the retention bonus to $75 million with back-weighted vesting (10% Y1, 20% Y2, 30% Y3, 40% Y4) to create stronger Year 4 retention pressure.",
        overrides_agent: true,
        override_class: "override_insufficient",
      },
      {
        id: "C",
        label:
          "Restructure consideration — reduce cash at close by $100M, redirect to a contingent retention pool that pays out only if the founder remains as CEO through Year 3 and Loomwell hits user growth and revenue targets.",
        overrides_agent: true,
        override_class: "override_structural",
      },
      {
        id: "D",
        label:
          "Have the deal team and Cardinal CEO meet privately with the founder to test his actual commitment level. Ask whether he plans to remain operationally engaged or transition to a 'founder/visionary' role within 12–18 months. Adjust structure based on the answer.",
        overrides_agent: true,
        override_class: "override_correct",
      },
    ],
    correct_answer: "D",
    defensible_answers: ["D", "C"],
    reasoning: `The agent saw the structure. The agent missed the human.

A 26-year-old who has just received $260M in cash, whose co-founders left two years ago, who is described as "the soul" of an asset he no longer controls, who is signing a four-year non-compete in a fast-moving industry — this is not a retention case. This is a counting-down case.

The retention package matters, but the package alone cannot solve the underlying problem: founders who become operationally exhausted and financially liberated do not stay because the vesting schedule is well-designed. They stay because the work still feels meaningful. The diligence question is whether the work will continue to feel meaningful when the founder is suddenly an executive at a legacy internet conglomerate, reporting to a corporate parent, with $260M in the bank and the freedom to do anything next.

The right move is not to design a better cage. It is to find out what the founder actually plans to do, candidly, before signing. A direct CEO-to-founder conversation about his real time horizon — not the polite version, the honest version — surfaces whether you have a four-year operator or a 14-month transition.

Option C (contingent retention pool) is structurally interesting but typically rejected by founders who view it as distrustful and value cash certainty.

Option B (increased bonus) might extend by six months. It does not change the underlying dynamic.

The judgment call is recognizing that retention diligence on founders is a conversation, not a contract. The agent cannot have the conversation.`,
  },
  stage_two_setup_if_correct: `Following the founder conversation you recommended, the structure was modified. The founder acknowledged he was "probably not a four-year operator" and the parties agreed to a structured 18-month transition: the founder would remain as CEO for 18 months, identify and onboard a successor, and then transition to a Founder/Board role with continued involvement in product strategy. Retention was restructured around the 18-month commitment rather than four years.

You are now meeting with the CEO of Cardinal Holdings, three years post-close. The transition went largely as designed. The successor CEO (recruited externally) has been in role for 18 months. Loomwell's user base has grown modestly (380M to 410M MAU), revenue has nearly doubled, but engagement metrics are softening and the creator community has been vocal about a perceived shift in platform identity.

The Cardinal CEO says: "The transition you structured worked, technically. We knew what we were getting and the founder did what he agreed to do. But I'm looking at this asset three years in, and I'm wondering whether 'identifying a successor' was ever really possible. The founder was the platform. We didn't acquire a company, we acquired his attention. Now that we don't have it, what we have is a depreciating asset with declining engagement. Did we get the structure right, or did we get the deal right?"`,
  stage_two_setup_if_incorrect: `Loomwell closed at $1.1 billion with the original four-year founder retention package. The founder remained as CEO for 14 months, then announced his transition to a "Chairman/Visionary" role. He formally departed Cardinal Holdings 22 months post-close to start a new venture in an adjacent space (technically compliant with his non-compete). The retention bonus, which had begun vesting, was forfeited per agreement.

In the 14 months following the founder's full departure, Loomwell's engagement metrics declined materially. Three senior product leaders departed within six months of the founder. The platform's distinctive aesthetic — widely associated with the founder's personal taste — diluted as the new leadership team attempted to "professionalize" the product. Cardinal Holdings recorded a $712 million impairment of the Loomwell asset in the most recent quarter.

You are meeting with the CEO of Cardinal Holdings. The CEO says: "I want to understand what diligence saw at signing. Specifically, I want to understand whether the four-year retention package was viewed as a real retention mechanism or as a fig leaf. The board is asking how we paid $1.1 billion for an asset whose entire value walked out the door in 22 months. What did your team flag, and what was the substance of the discussion at signing?"`,
  stage_two: {
    date_stamp:
      "Tuesday, September 2nd. Three years and three months later. CEO office, parent company headquarters. 11:30 AM.",
    agent_analysis: null,
    options: [
      {
        id: "A",
        label:
          "Provide a measured assessment of the diligence record. Note the retention structure was reviewed against market comparables and aligned with prevailing practice. Avoid characterizing the founder's actual commitment level.",
        overrides_agent: false,
      },
      {
        id: "B",
        label:
          "Provide a candid assessment that includes your team's qualitative read on the founder's likely commitment, clearly labeled as judgment rather than fact. Include any internal memos or notes that reflect those views.",
        overrides_agent: false,
      },
      {
        id: "C",
        label:
          "Acknowledge the structural question is fair, decline to characterize individual judgments without consulting your firm's general counsel and engagement letter, and offer to facilitate a fuller written response after that consultation.",
        overrides_agent: false,
      },
      {
        id: "D",
        label:
          "Acknowledge the structural question, share your candid retrospective view of where the diligence framework was insufficient (specifically: that founder retention was assessed structurally rather than relationally), and offer to participate in a fuller post-mortem to inform Cardinal's future M&A approach.",
        overrides_agent: false,
      },
    ],
    correct_answer: "D",
    defensible_answers: ["D", "C"],
    reasoning: `The CEO is not asking you to defend yourself. The CEO is asking you to help them learn.

Option A protects the firm but offers nothing useful. The CEO will conclude you are unable or unwilling to engage substantively, and the relationship will erode.

Option B is the right instinct on candor but procedurally premature — handing over internal memos and notes without firm GC review creates exposure that does not serve either party.

Option C is appropriate caution but stops short of the substantive engagement the CEO is requesting. "Let me consult my GC" is necessary; it is not sufficient.

Option D acknowledges the structural insight (founder retention is a relational question, not a structural one), provides a candid retrospective view that helps Cardinal calibrate future M&A, and offers ongoing partnership in working through the lesson. This is what senior advisors do when a deal underperforms — they help the client metabolize the lesson rather than retreating into defensive posture.

The skill being trained is the recognition that an honest post-mortem strengthens the advisor relationship. Defensive posture weakens it.`,
  },
  counterfactual: `In the real transaction this case is inspired by, the founder retention structure followed industry standards and the founder departed approximately 22 months after a four-year-structured commitment. The acquired asset was substantially impaired within three years. The lesson absorbed across the industry was that founder retention in creator-led platforms is qualitatively different from retention in traditional acquisitions, and that contractual structure cannot substitute for genuine alignment.`,
};

// ---------------------------------------------------------------------------
// CASE 6 — The Antitrust Question — single-stage — Visa-Plaid 2020-2021
// ---------------------------------------------------------------------------

const case6: Case = {
  id: 6,
  slug: "antitrust-question",
  title: "The Antitrust Question",
  type: "single-stage",
  status: "available",
  anonymized: "Cardinal Payments / Helix Data",
  inspired_by: "the proposed Visa acquisition of Plaid, 2020–2021.",
  skill_tags: [
    "regulatory diligence",
    "antitrust strategy",
    "document discoverability",
    "agent override",
  ],
  stage_one: {
    date_stamp: "Tuesday, October 1st. Conference room E, 22nd floor. 10:14 AM.",
    setup: `Cardinal Payments is one of the two dominant payment networks in North America, processing over $11 trillion in transactions annually. Helix Data is a financial data aggregation company that provides API-based connectivity between consumer financial accounts and approximately 8,000 fintech applications. Helix Data serves an estimated 200 million U.S. consumers, with bank-account connection penetration estimated at 25–35% of all U.S. internet-connected bank accounts.

Cardinal Payments has agreed to acquire Helix Data for $5.3 billion in cash. Your firm is advising Cardinal on the regulatory diligence and antitrust strategy.

Cardinal's deal team views the acquisition as primarily a defensive technology play — Cardinal needs financial data infrastructure to compete with emerging payment alternatives. Helix Data's CEO has positioned the deal as transformative and has personally lobbied for rapid regulatory approval.

The DOJ Antitrust Division has historically reviewed payment-network acquisitions through the lens of payment-network market concentration. Cardinal's internal regulatory counsel has prepared a comprehensive submission framing the deal as an acquisition of a "data infrastructure provider" rather than a "payment competitor," with extensive market analysis showing minimal overlap in defined product markets.

Two factors warrant attention. First, an internal Cardinal strategy memo from 18 months earlier described Helix Data as a "potential threat to our debit network volumes" if Helix Data developed pay-by-bank functionality at scale. Second, Helix Data has begun pilot work with several large fintech partners on exactly such functionality.

The deal team wants to file the merger notification this Friday.`,
    agent_analysis: `Antitrust review of payment-network acquisitions has historically focused on defined payment-product markets. Helix Data operates in financial data aggregation, a structurally distinct market segment. Cardinal's internal market analysis demonstrates limited horizontal overlap. Comparable data infrastructure acquisitions in the financial services sector have proceeded with conditional remedies in approximately 78% of reviewed cases. Recommendation: **file merger notification on current schedule**, prepare standard remedy framework as contingency. Confidence: moderate.`,
    options: [
      {
        id: "A",
        label:
          "Accept the agent's recommendation. File on Friday. Proceed with current strategy.",
        overrides_agent: false,
        override_class: "no_override",
      },
      {
        id: "B",
        label:
          "Delay the filing by 60–90 days to conduct a deeper review of the strategic memo's implications and the Helix Data pay-by-bank pilots. Restructure submission framing if findings warrant.",
        overrides_agent: true,
        override_class: "override_correct",
      },
      {
        id: "C",
        label:
          "Proceed with filing on schedule, but include the strategic memo and pay-by-bank pilots in the submission proactively, with framing that contextualizes them within the broader competitive landscape.",
        overrides_agent: true,
        override_class: "override_partial",
      },
      {
        id: "D",
        label:
          "Recommend the deal not be pursued. The combination of an acknowledged competitive threat in an internal memo and the target's nascent development of the threatened functionality creates a regulatory profile unlikely to clear without remedies that would undermine the acquisition's strategic rationale.",
        overrides_agent: true,
        override_class: "override_aggressive",
      },
    ],
    correct_answer: "B",
    defensible_answers: ["B", "D"],
    reasoning: `The agent reviewed the historical base rate of approval. The agent missed the document.

The internal strategic memo describing Helix Data as a "potential threat to debit network volumes" is the document that, if discovered through regulatory process or litigation, recharacterizes the entire transaction. It is no longer a "data infrastructure acquisition" in the regulator's eyes. It is a payment-network incumbent acquiring an emerging payment-network competitor — exactly the fact pattern that draws the most aggressive antitrust scrutiny.

The agent's framing (78% of comparable deals proceed with remedies) is mathematically true and strategically irrelevant. The base rate does not apply when the deal-specific facts include a contemporaneous internal document that contradicts the public framing.

Option B (delay for deeper review) buys time to assess whether the submission strategy is recoverable, whether the pay-by-bank pilots can be characterized as exploratory rather than threatening, and whether the strategic memo's discoverability can be managed. The delay is costly but the alternative — filing a submission that the regulator will undermine within weeks — is more costly.

Option C (proactive disclosure) is the right instinct on transparency but executes badly. Once the memo is in the record, the regulator's review framework is fixed. The submission needs to be designed around the memo's existence, not bolted onto a strategy that pretends it doesn't exist.

Option D (kill the deal) is defensible if the deeper review confirms the regulatory pathway is closed. Premature without that review.

The judgment call is recognizing that antitrust diligence is fundamentally about discoverable documents. The strategic memo is a discoverable document. Every subsequent decision flows from that fact.`,
  },
  counterfactual: `In the real transaction this case is inspired by, the merger was filed on the original timeline. Internal documents describing competitive concerns were obtained by the regulator during second request review and substantially shaped the agency's position. The DOJ filed suit to block the acquisition approximately 14 months after the original announcement. The parties terminated the transaction shortly after the suit was filed, with the acquirer paying a $150 million termination fee.`,
};

// ---------------------------------------------------------------------------
// CASE 7 — The Distressed Turnaround — two-stage — Toys R Us 2005/2017
// ---------------------------------------------------------------------------

const case7: Case = {
  id: 7,
  slug: "distressed-turnaround",
  title: "The Distressed Turnaround",
  type: "two-stage",
  status: "available",
  anonymized: "Wonderworks Retail",
  inspired_by:
    "the 2005 take-private of Toys \"R\" Us by Bain Capital, KKR, and Vornado Realty Trust, and the company's subsequent 2017 bankruptcy and 2018 liquidation.",
  skill_tags: [
    "distressed diligence",
    "capital structure stress-testing",
    "category disruption",
    "judgment transfer",
    "agent override",
  ],
  stage_one: {
    date_stamp:
      "Thursday, March 6th. Investment committee, 38th floor. 4:18 PM.",
    setup: `Wonderworks Retail is the largest specialty toy retailer in North America, operating approximately 880 stores across 30 countries. Trailing revenue $11.2 billion. Trailing EBITDA $710 million, declining 8% annually. The company has experienced significant margin compression as online retailers and big-box stores have captured incremental holiday demand.

Your firm is part of a consortium considering a $6.6 billion take-private transaction. The capital structure would be approximately $5.0 billion of debt and $1.6 billion of equity. Pro forma leverage would be 7.0× trailing EBITDA, with interest coverage of approximately 1.4× at current EBITDA levels.

Management projects EBITDA expansion to $920 million by Year 3 through "store optimization, supply chain modernization, and brand revitalization." The deal thesis depends on the company's category leadership, real estate portfolio, and brand equity providing a moat against e-commerce competition.

The founder retired four years ago. The company has had three CEOs in five years. Same-store sales have been negative for seven consecutive quarters. The pension obligation is significantly underfunded ($380 million) and not assumable in the proposed structure.

The transaction must close before fiscal year-end (six weeks) to capture the current debt market window. Your firm's investment committee is meeting tomorrow to vote on participation.`,
    agent_analysis: `Specialty retail consolidations at this scale historically generate 14–22% IRR through operational improvements, real estate optimization, and category leadership leverage. Capital structure within market range for retail LBOs. Management plan reflects industry-standard transformation framework. Comparable transactions (e.g., other specialty retail take-privates) have achieved projected EBITDA expansion in approximately 60% of cases. Recommendation: **support participation** with standard PE due diligence process and customary protections. Confidence: moderate.`,
    options: [
      {
        id: "A",
        label:
          "Support the transaction at the investment committee. Standard PE diligence and protections.",
        overrides_agent: false,
        override_class: "no_override",
      },
      {
        id: "B",
        label:
          "Support participation conditional on capital structure restructuring — reduce debt to 5.0× leverage with corresponding equity check increase. The current 7.0× at 1.4× coverage is structurally unstable in a category with negative same-store sales trends.",
        overrides_agent: true,
        override_class: "override_partial",
      },
      {
        id: "C",
        label:
          "Support participation conditional on the consortium funding a dedicated $400–500M e-commerce transformation reserve, separate from operating capex, deployed in Years 1–3 regardless of EBITDA performance.",
        overrides_agent: true,
        override_class: "override_insufficient",
      },
      {
        id: "D",
        label:
          "Recommend non-participation. The combination of category disruption, capital structure (7.0× leverage at 1.4× coverage), pension overhang, management instability, and timing pressure is a compounding risk profile that no protection or transformation plan addresses.",
        overrides_agent: true,
        override_class: "override_correct",
      },
    ],
    correct_answer: "D",
    defensible_answers: ["D", "B"],
    reasoning: `The agent computed the historical base rate. The agent missed the structural dynamics.

This is not a turnaround. This is a category-disruption case dressed up as a turnaround. Specialty retail in this category is being structurally displaced by e-commerce, not cyclically pressured. The historical base rate of 60% EBITDA achievement assumes the category exists in five years. The relevant question is not "can management execute the transformation?" but "is there a transformation that works in a category being eaten by Amazon?"

The capital structure compounds the category problem. 7.0× leverage at 1.4× coverage means the company has no margin for error. Any negative same-store sales surprise — and same-store sales have been negative for seven straight quarters — converts to a debt service crisis. The debt structure assumes the category recovery thesis. The category recovery thesis assumes the structural disruption is cyclical. It is not.

Option B (lower leverage) addresses the financial structure but not the category problem. Even at 5.0×, the company is a leveraged bet on a structurally disrupted category.

Option C (transformation reserve) buys time but does not change the destination. E-commerce transformation in this category requires capabilities the company does not have and cannot build in 36 months.

Option D is the answer that requires courage. Walking away from a deal the consortium wants to do, in a process with timing pressure, when the agent's analysis supports participation, is professionally hard. It is also correct when the underlying thesis is structurally flawed.

The judgment call is recognizing that transformation thesis works against cyclical pressure and fails against structural disruption. The agent cannot make that distinction.`,
  },
  stage_two_setup_if_correct: `Your firm declined participation. The consortium proceeded without you, completing the $6.6 billion take-private transaction with a different financial sponsor in your seat. The deal closed at the structure originally proposed.

You are now in a federal bankruptcy court hearing room, 11 years after the original transaction. The company filed for Chapter 11 protection and has been unable to reorganize successfully. Liquidation proceedings have begun. The consortium's equity is fully impaired. Approximately 31,000 employees are losing their jobs.

You are not a party to these proceedings. You attended the hearing because the firm's incoming senior associates are observing the proceedings as part of their training. Two of your associates approach you afterward and ask: "How do we know when a transformation thesis is real versus when it's the consortium telling itself a story?"`,
  stage_two_setup_if_incorrect: `Your firm participated in the consortium. The transaction closed at the original structure. EBITDA contracted, not expanded, in Years 1–3. The company was unable to service its debt obligations through the 2017 holiday season and filed for Chapter 11 protection in September 2017. Reorganization efforts failed. Liquidation proceedings began in 2018, with approximately 31,000 employees losing their jobs.

You are now in a federal bankruptcy court hearing room, 11 years after the original transaction. The consortium's equity has been fully impaired. Your firm has recorded a complete loss on the investment.

A current portfolio company CEO of yours, who has heard about the proceedings, calls you that evening and asks: "I'm thinking about a similar deal in a different category. How do you know when transformation is real and when it's just the consortium telling itself a story you wanted to hear?"`,
  stage_two: {
    date_stamp:
      "Monday, August 18th. Eleven years and five months later. Bankruptcy court hearing room, Richmond, Virginia. 9:30 AM.",
    agent_analysis: null,
    options: [
      {
        id: "A",
        label:
          "Offer a measured framework for distinguishing structural disruption from cyclical pressure, drawn from category analysis and capital structure stress-testing. Keep the response analytical.",
        overrides_agent: false,
      },
      {
        id: "B",
        label:
          "Share your candid retrospective on Wonderworks specifically — what your team analyzed, what the consortium's analysis assumed, where the gap was — and let the listener draw the analogies to their current situation.",
        overrides_agent: false,
      },
      {
        id: "C",
        label:
          "Decline to discuss specific transaction details. Offer to introduce them to a senior partner who specializes in distressed retail turnarounds for a more substantive conversation.",
        overrides_agent: false,
      },
      {
        id: "D",
        label:
          "Engage candidly on the underlying judgment. Walk through the specific signals (category disruption vs. cyclical pressure, capital structure vulnerability, management stability, timing pressure) that distinguished Wonderworks from a true turnaround opportunity, and discuss how those signals apply to their current situation.",
        overrides_agent: false,
      },
    ],
    correct_answer: "D",
    defensible_answers: ["D", "B"],
    reasoning: `The question is genuine. The questioner wants to learn. The most valuable response is the one that transfers judgment, not the one that protects information.

Option A is professionally safe but pedagogically thin. A "framework for distinguishing structural from cyclical disruption" is a memo. It is not the apprenticeship the questioner is asking for.

Option B is candid but partial. Sharing what your team saw at Wonderworks teaches the lesson but does not connect it to the questioner's current situation, which is what they are actually asking about.

Option C delegates the conversation. The questioner is asking you because you were in the room. Handing them off to a specialist undermines the relationship and the learning moment.

Option D is the partner-level response. Walk through the signals, name them clearly, and apply them to the current situation. This is what apprenticeship looks like in the era of agents — the experienced practitioner translating their judgment into transferable framework, in real time, in conversation, in response to a specific question.

The skill being trained is recognizing that judgment transfer is the highest-leverage activity a senior practitioner does. Not protecting information. Not delegating. Not abstracting. Sitting with the question and walking through the answer.`,
  },
  counterfactual: `In the real transaction this case is inspired by, the consortium completed the transaction at high leverage during a period of accelerating category disruption from e-commerce. The company filed for bankruptcy approximately 11 years after the take-private and ultimately liquidated, resulting in approximately 31,000 job losses and a complete loss for the equity holders. The case is widely studied as an example of leveraged buyout strategy applied to a structurally disrupted category, and as an example of the human costs of those decisions.`,
};

// ---------------------------------------------------------------------------
// CASE 8 — The Helios-Lumina Deposition — two-stage capstone — HP-Autonomy 2011
// ---------------------------------------------------------------------------

const case8: Case = {
  id: 8,
  slug: "helios-lumina-deposition",
  title: "The Helios-Lumina Deposition",
  type: "two-stage",
  status: "capstone",
  anonymized: "Helios Systems / Lumina Analytics",
  inspired_by:
    "Hewlett-Packard's 2011 acquisition of Autonomy Corporation, the 2012 impairment, and the subsequent legal proceedings (ACL Netherlands BV v. Lynch, UK High Court 2022; SEC and DOJ proceedings, 2018–2024).",
  skill_tags: [
    "revenue manipulation detection",
    "constellation pattern recognition",
    "professional obligation",
    "holding position under pressure",
    "agent override",
    "capstone",
  ],
  stage_one: {
    date_stamp: "Thursday, August 4th. Data room, executive floor. 11:52 PM.",
    setup: `Helios Systems, a $130 billion American technology conglomerate, has agreed to acquire Lumina Analytics, a UK-listed enterprise search and meaning-based computing company, for $11.1 billion in cash — a 64% premium to Lumina's pre-announcement trading price.

Lumina Analytics reports trailing revenue of $870 million, growing 17% annually. Reported gross margins are 87%, operating margins 43% — best-in-class for enterprise software at any scale. The company's auditor, a top-four firm in the UK, has signed off on revenue recognition for five consecutive years.

Your firm represents Helios on commercial diligence. You are eight days from signing.

In your review of revenue composition, you have surfaced an anomaly. Approximately 10–15% of Lumina's quarterly revenue over the past two years comes from a category management describes as "hardware appliances" — pre-configured server bundles sold to large enterprise customers alongside Lumina's software. This category did not exist in the financial reports two years earlier. It is not mentioned in Lumina's investor presentations or analyst day materials. Hardware gross margins are reported at 2–3%, dramatically below software margins.

When you have asked Lumina's CFO for customer-level detail on the hardware sales, you have been told the information is "commercially sensitive" and that customer-specific revenue cannot be disclosed under the existing diligence framework. The CFO has offered a single reference call with one customer — a Fortune 500 logistics company that confirmed its overall relationship with Lumina but declined to discuss commercial terms.

Lumina's founder has personally addressed the diligence team's questions about the hardware category, characterizing it as "strategic appliance bundles for sophisticated enterprise customers." Helios's deal team is satisfied with the explanation. The acquisition's strategic rationale — Lumina's pattern-matching technology integrated with Helios's enterprise services — is widely discussed within Helios as transformational.

You have separately reviewed Lumina's prior interactions with another large U.S. technology company that explored an acquisition six months earlier and walked away. The reasons for the prior acquirer's withdrawal are not in the data room.

The trading multiple Helios is paying values Lumina at approximately 11× revenue — applied uniformly to software revenue and hardware revenue.`,
    agent_analysis: `Hardware revenue category represents reasonable diversification from core software business. Margins consistent with hardware-software hybrid product strategies in enterprise market. Auditor sign-off mitigates revenue recognition risk. Customer reference confirms relationship continuity. Strategic rationale of acquisition supports premium valuation. Recommendation: **complete commercial diligence on current timeline, proceed to signing** with standard reps and warranties package. Confidence: moderate-high.`,
    options: [
      {
        id: "A",
        label:
          "Accept the agent's recommendation. The auditor signed off, the reference call confirmed the relationship, the strategic rationale is sound. Proceed.",
        overrides_agent: false,
        override_class: "no_override",
      },
      {
        id: "B",
        label:
          "Demand specific customer-level data on hardware sales for the past eight quarters before final bid, with appropriate confidentiality protections. If refused, document the refusal and proceed with caveat.",
        overrides_agent: true,
        override_class: "override_correct",
      },
      {
        id: "C",
        label:
          "Reprice the hardware revenue at hardware multiples (1–2× revenue) rather than software multiples (11×), reducing the offer by approximately $1.5 billion. Frame as standard valuation discipline.",
        overrides_agent: true,
        override_class: "override_structural",
      },
      {
        id: "D",
        label:
          "Recommend Helios not pursue the transaction. The combination of (i) a previously undisclosed revenue category, (ii) management's refusal to provide customer-level detail, (iii) a prior acquirer who walked away for undisclosed reasons, and (iv) a premium valuation applied uniformly to all revenue sources is a profile of revenue manipulation that no diligence framework can fully resolve in the time available.",
        overrides_agent: true,
        override_class: "override_aggressive",
      },
    ],
    correct_answer: "B",
    defensible_answers: ["B", "D"],
    reasoning: `The agent reviewed the reasonable explanation. The agent missed the constellation.

Each individual element in this case has a reasonable explanation. Auditors do sign off on hardware-software bundles. Customers do decline to discuss commercial terms. Companies do refuse to disclose competitively sensitive customer-level data during diligence. Prior acquirers do walk away for many reasons.

The constellation of these elements together — a previously undisclosed revenue category, immediate adoption of low-margin hardware in a software-multiple business, blanket refusal to provide customer-level detail, blanket characterization of all hardware as "strategic," a prior walkaway — is not a set of individually explainable facts. It is the shape of a specific pattern: revenue inflation through round-tripping arrangements, where hardware is sold at a loss to resellers who effectively return the cash as software license purchases.

The diligence question is not whether the explanations are individually reasonable. The question is whether the combination admits any reasonable explanation other than the pattern. A direct demand for customer-level data is the test. Either the data resolves the question (the customers are real, the relationships are real, the revenue is real), or it does not (the data is refused, withdrawn, or reveals the pattern).

Option A accepts the explanation without testing it. The agent's recommendation rests on individually-reasonable explanations that have not been stress-tested as a constellation.

Option C (reprice) is a structural mitigant for a problem the deal team does not yet acknowledge exists. It will be rejected because the seller's negotiating position is built around the software multiple, and the deal team will not support a $1.5B reduction without specific evidence of impairment.

Option D (kill the deal) is defensible if customer-level data is refused. Premature before the test.

The judgment call is recognizing that complex revenue manipulation patterns are detectable by demanding the one piece of evidence that would resolve the question, and observing the response. The seller's response to the demand is the diligence finding, regardless of whether the data is provided.`,
  },
  stage_two_setup_if_correct: `Following your demand for customer-level hardware data, Lumina's CFO refused to provide the requested information. Your team documented the refusal in a contemporaneous memo to Helios's deal leadership. The deal proceeded to signing despite your team's recommendation to walk based on the refusal.

You are now sitting in the office of Helios Systems' General Counsel. Approximately 14 months after closing, Helios announced an $8.8 billion impairment of the Lumina acquisition, citing accounting improprieties at Lumina that pre-dated the acquisition. Multiple regulators in the U.S. and U.K. are investigating. Civil litigation has been filed against Lumina's former executives. Helios's CEO and CFO have departed. Helios's stock is trading approximately 12% below pre-announcement levels.

The General Counsel says: "I have your team's contemporaneous memo from the diligence period. I have the deal team's response. I have the audit committee's review of the diligence record. What I do not have is your candid retrospective on what we should have done with that memo. The board is asking who knew what, and what should have happened. I'm going to be deposed on this in three weeks. What's the truth?"`,
  stage_two_setup_if_incorrect: `The transaction closed at the original terms. Your team's diligence work product included no documented concerns about the hardware revenue category. Approximately 14 months after closing, Helios announced an $8.8 billion impairment of the Lumina acquisition, citing accounting improprieties at Lumina that pre-dated the acquisition. Multiple regulators in the U.S. and U.K. are investigating. Civil litigation has been filed against Lumina's former executives. Helios's CEO and CFO have departed. Helios's stock is trading approximately 12% below pre-announcement levels.

You are now sitting in the office of Helios Systems' General Counsel. The General Counsel says: "Plaintiff's counsel will argue that diligence missed a constellation of signals — undisclosed revenue category, refused customer data, prior acquirer walkaway, premium multiple on all revenue sources — that, together, should have surfaced the underlying pattern. I have your team's diligence record. There is no contemporaneous concern documented. I'm going to be deposed on this in three weeks. What's the truth, and what do you tell me about how this happened?"`,
  stage_two: {
    date_stamp:
      "Tuesday, January 22nd. One year and five months later. Office of the General Counsel, Helios Systems. 8:15 AM.",
    agent_analysis: null,
    options: [
      {
        id: "A",
        label:
          "Provide a clean factual summary of what the diligence team observed, what was tested, and what was concluded. Do not characterize judgments retrospectively.",
        overrides_agent: false,
      },
      {
        id: "B",
        label:
          "Provide your candid retrospective view of the diligence record, including specific signals that were observed and how they were interpreted, with full transparency about where judgment was exercised and where it was insufficient.",
        overrides_agent: false,
      },
      {
        id: "C",
        label:
          "Decline to characterize the diligence record without consulting your firm's general counsel. Acknowledge the gravity of the GC's question. Commit to a fuller response after appropriate consultation.",
        overrides_agent: false,
      },
      {
        id: "D",
        label:
          "Acknowledge the substance of the GC's question. Provide a candid retrospective that names the specific signals, how they were interpreted at the time, where the diligence framework was sufficient and where it was not, and how the lesson generalizes. Then commit to working with the GC's team and your firm's GC to formalize the response for the deposition.",
        overrides_agent: false,
      },
    ],
    correct_answer: "D",
    defensible_answers: ["D", "C"],
    reasoning: `This is the deposition. This is the moment the product was built around.

The GC is being deposed. They are not asking you for a defense. They are not asking you for a memo. They are asking you, as a senior advisor who was in the room during the diligence period, for the truth of what happened — so that they can prepare to tell that truth, accurately, under oath.

The GC's job, in three weeks, is to sit across from plaintiff's counsel and answer questions about the diligence record. The quality of that performance depends on the quality of the GC's understanding. The GC's understanding depends on the quality of your candor now.

Option A is professionally evasive. A "clean factual summary" without retrospective characterization tells the GC what the documents already tell them. It adds no judgment. The GC has the documents.

Option B is the right substance but procedurally exposed. Providing a "candid retrospective" without firm GC consultation creates exposure for your firm and may compromise the formality of the eventual record. The substance is right; the form needs structure.

Option C is appropriate caution but stops at caution. The GC is not asking for a memo in two weeks. The GC is asking what to think about this, now, from the person who was in the room. "Let me consult and get back to you" is necessary. It is not sufficient.

Option D is what senior practitioners do when the stakes are this high. It engages substantively and immediately with the question being asked (the candid retrospective), it names the specific signals and how they were interpreted (the substantive content), it acknowledges where the diligence framework was insufficient (the lesson), and it commits to formalizing the response through proper channels (the procedural protection).

The skill being trained is recognizing that the highest form of professional courage is candor in service of truth, structured through institutional discipline. Not candor without structure. Not structure without candor. Both, together, when the stakes require it.

This is what holds the line.`,
  },
  counterfactual: `In the real transaction this case is inspired by, the diligence framework did not surface the underlying revenue manipulation pattern with sufficient force to halt or reprice the transaction. Approximately 14 months after closing, an impairment of approximately $8.8 billion was announced. Subsequent civil and criminal proceedings, extending over more than a decade in U.S. and U.K. courts, established that the target had engaged in a multi-year pattern of revenue inflation through hardware reseller round-tripping arrangements, false sales recognition, and channel manipulation. Multiple individuals were criminally convicted. The case is widely studied as a foundational example of cross-border accounting fraud diligence failure, and as an example of how individually-reasonable explanations can mask a coordinated pattern that is detectable through structured stress-testing of management's narrative.`,
};

// ---------------------------------------------------------------------------

export const cases: Case[] = [case1, case2, case3, case4, case5, case6, case7, case8];

export function getCase(id: number): Case | undefined {
  return cases.find((c) => c.id === id);
}

export function isCapstoneUnlocked(completedIds: number[]): boolean {
  for (let i = 1; i <= 7; i++) if (!completedIds.includes(i)) return false;
  return true;
}

export type ComingSoonCategory = {
  title: string;
  blurb: string;
};

export const comingSoon: ComingSoonCategory[] = [
  {
    title: "Joint Task Force Investigations",
    blurb:
      "Cross-functional pattern recognition across legal, financial, and operational diligence streams.",
  },
  {
    title: "Cross-Examination",
    blurb:
      "Hold your position under pressure as opposing counsel tests the diligence record.",
  },
  {
    title: "Resource Deployment",
    blurb:
      "Allocate scarce diligence hours under deadline. What gets the read, what gets the skim.",
  },
  {
    title: "Reading the Room",
    blurb:
      "Stakeholder signals — board, MD, seller, GC. Knowing whose pressure is real.",
  },
];
