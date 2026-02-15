import type { Item } from "./types";

/* -------------------------------------------
   Methodist Hymnbook (real + placeholder)
------------------------------------------- */

const realHymns: Item[] = [
  { number: 1, firstLine: "O for a Thousand Tongues to Sing", tune: ["AZMON", "LYDIA", "RICHMOND"] },
  { number: 2, firstLine: "Come, Thou Fount of Every Blessing", tune: ["NETTLETON"] },
  { number: 3, firstLine: "Holy, Holy, Holy! Lord God Almighty", tune: ["NICAEA"] },
  { number: 4, firstLine: "Praise to the Lord, the Almighty", tune: ["LOBE DEN HERREN"] },
  { number: 5, firstLine: "Amazing Grace! How Sweet the Sound", tune: ["NEW BRITAIN", "ST. MARY'S", "ARLINGTON"] },
  { number: 6, firstLine: "All Hail the Power of Jesus' Name", tune: ["CORONATION", "DIADEM"] },
  { number: 7, firstLine: "O God, Our Help in Ages Past", tune: ["ST. ANNE"] },
  { number: 8, firstLine: "Crown Him with Many Crowns", tune: ["DIADEMATA"] },
  { number: 9, firstLine: "Guide Me, O Thou Great Jehovah", tune: ["CWM RHONDDA", "ZION"] },
  { number: 10, firstLine: "Come, Thou Long-Expected Jesus", tune: ["HYFRYDOL", "STUTTGART", "CROSS OF JESUS"] },
  { number: 11, firstLine: "Joyful, Joyful, We Adore Thee", tune: ["HYMN TO JOY", "ODE TO JOY"] },
  { number: 12, firstLine: "Great Is Thy Faithfulness", tune: ["FAITHFULNESS"] },
  { number: 13, firstLine: "Blessed Assurance, Jesus Is Mine!", tune: ["ASSURANCE"] },
  { number: 14, firstLine: "Be Thou My Vision", tune: ["SLANE", "BYZANTIUM", "ST. COLUMBA"] },
  { number: 15, firstLine: "How Great Thou Art", tune: ["O STORE GUD"] },
];

const placeholderHymns: Item[] = Array.from({ length: 285 }, (_, i) => ({
  number: i + 16,
  firstLine: `Sample Hymn First Line ${i + 16}`,
  tune: [`TUNE ${i + 16}`],
}));

export const methodistHymnbook: Item[] = [...realHymns, ...placeholderHymns];
