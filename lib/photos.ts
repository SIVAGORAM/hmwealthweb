// Hero photography from Unsplash, free for commercial use under the Unsplash License (https://unsplash.com/license).
// To use your own photos instead: put files in /public/images and change `src` to "/images/your-file.jpg".
const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80`;

export const photos = {
  motherDaughter: { src: u("1589169011402-8b2cbd1ee593"), alt: "Mother and daughter laughing together on a sofa", credit: "Vivek Kumar" },
  family: { src: u("1780980301761-f6e0fa6f0bdf"), alt: "Young family of four sitting together at home", credit: "joao victor guimaraes" },
  seniors: { src: u("1595142062395-98e89b1ad216"), alt: "Senior couple standing together outdoors", credit: "Pradnyal Gandhi" },
  professional: { src: u("1683107695974-98a9fddb249a"), alt: "Young woman working on a laptop at home", credit: "Sweet Life" },
  home: { src: u("1730130596425-197566414dc4"), alt: "Family performing a puja together in their decorated home", credit: "The Ordinary Moments" },
  bigFamily: { src: u("1780329944309-08b392306b49"), alt: "Family of five smiling together", credit: "Rohit Dey" },
};
