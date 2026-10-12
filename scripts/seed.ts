import { database } from "../src/lib/database";

const samples = [
  {
    title: "The quiet art of starting small",
    slug: "the-quiet-art-of-starting-small",
    published: 1,
    content: `There is a particular kind of freedom in beginning with something small. A notebook instead of a roadmap. A single page instead of a whole publication. An idea that fits in the margin.

We tend to imagine meaningful work arriving fully formed. In practice, it is assembled from ordinary moments: a question on a walk, a sentence written before breakfast, a rough version shared with a friend.

The first version does not need to carry the weight of everything it might become. It only needs to exist. Make something modest enough to finish and useful enough to revisit.

Small beginnings leave room for discovery. And sometimes, that room is exactly what a good idea needs.`,
  },
  {
    title: "Designing for a slower internet",
    slug: "designing-for-a-slower-internet",
    published: 1,
    content: `What if a website asked a little less of us? Fewer interruptions. A clear path. Enough space to read a thought from beginning to end.

A slower internet is not about making pages take longer to load. It is about allowing the person on the other side of the screen to set the pace. We can make interfaces quick without making them impatient.

Begin with the words. Give them a comfortable measure and a generous line height. Make the next action obvious without turning every button into a demand. Let empty space do some of the organizing.

Good design can be an invitation rather than an interruption. A place to arrive, take a breath, and find what matters.`,
  },
  {
    title: "A notebook, a walk, a new perspective",
    slug: "a-notebook-a-walk-a-new-perspective",
    published: 1,
    content: `I used to think I needed to sit at my desk until an idea appeared. Now I know that sometimes the most productive thing I can do is leave it.

On a walk, attention changes shape. It moves from the narrow problem in front of me to the pattern of light on a wall, the rhythm of footsteps, the small details I usually miss.

I carry a notebook, but I do not give myself an assignment. One observation is enough. A color, a phrase, a question. Later, those fragments become unexpected starting points.

Perspective is not always something we think our way into. Sometimes it is a place we walk toward.`,
  },
  {
    title: "Making space for unfinished ideas",
    slug: "making-space-for-unfinished-ideas",
    published: 0,
    content: `Not every idea needs to become something today. Some need a little space to sit beside other ideas before their shape becomes clear.

This is a draft about keeping a practice of collecting rather than constantly completing. A place to think without immediately deciding what the thought is for.

Next: explore how returning to old notes changes the questions we ask.`,
  },
  {
    title: "Notes on building with intention",
    slug: "notes-on-building-with-intention",
    published: 0,
    content: `Before adding a feature, I am learning to ask a quieter question: what would make the existing experience feel complete?

Sometimes the answer is an empty state that offers a useful next step. Sometimes it is a confirmation before something disappears. Often, it is simply a clearer sentence.

Intention shows up in the small decisions. This draft is a collection of those decisions, and the reasons behind them.`,
  },
];
const db = database();
const seed = db.transaction(() => {
  let inserted = 0;
  samples.forEach((article, index) => {
    const stamp = new Date(Date.UTC(2026, 9, 12 - index, 9, 30)).toISOString();
    inserted += db
      .prepare(
        "INSERT INTO articles (title, slug, content, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(slug) DO NOTHING",
      )
      .run(
        article.title,
        article.slug,
        article.content,
        article.published,
        stamp,
        stamp,
      ).changes;
  });
  return inserted;
});
console.log(
  `Database ready at data/cms.db. Added ${seed()} sample articles (3 published, 2 drafts in the sample set). Existing entries preserved.`,
);
db.close();
