// All site photos are stored locally in /public/images, so they never go missing.
// Originals are from Unsplash, free for commercial use under the Unsplash License (https://unsplash.com/license).
const img = (name: string) => `/images/${name}.webp`;

export const photos = {
  motherDaughter: { src: img("mother-daughter"), alt: "Mother and daughter laughing together on a sofa", credit: "Vivek Kumar" },
  family: { src: img("family"), alt: "Young family of four sitting together at home", credit: "joao victor guimaraes" },
  seniors: { src: img("seniors"), alt: "Senior couple standing together outdoors", credit: "Pradnyal Gandhi" },
  professional: { src: img("professional"), alt: "Young woman working on a laptop at home", credit: "Sweet Life" },
  home: { src: img("home-puja"), alt: "Family performing a puja together in their decorated home", credit: "The Ordinary Moments" },
  bigFamily: { src: img("big-family"), alt: "Family of five smiling together", credit: "Rohit Dey" },
  doctor: { src: img("doctor"), alt: "Smiling doctor in blue scrubs with a stethoscope", credit: "Unsplash" },
  car: { src: img("car"), alt: "Red car parked on a tree-lined road", credit: "Unsplash" },
  shop: { src: img("shop"), alt: "Shop owner standing in his shop", credit: "Unsplash" },
  coupleLaptop: { src: img("couple-laptop"), alt: "Couple sitting on a sofa looking at a laptop", credit: "Unsplash" },
  youngCoupleLaptop: { src: img("young-couple-laptop"), alt: "Young couple looking at a laptop together", credit: "Unsplash" },
  classroom: { src: img("classroom"), alt: "Children studying at their desks in a classroom", credit: "Unsplash" },
  students: { src: img("students"), alt: "Two students reading a book together", credit: "Unsplash" },
  graduate: { src: img("graduate"), alt: "Graduate smiling in cap and gown", credit: "Unsplash" },
  friendsPhone: { src: img("friends-phone"), alt: "Two people smiling while looking at a phone", credit: "Unsplash" },
  wealthCouple: { src: "/images/pages/inv-couple-tablet.jpg", alt: "Indian couple smiling while reviewing their investments on a tablet", credit: "Pexels" },
} as const;
