// Tags <img> elements rendered from the weekly session markdown
// (src/content/sessions/*.md) with a teaching-image presentation class, keyed
// on filename.
//
// Plain CommonMark `![alt](src)` has no syntax for attaching a class, and the
// sessions collection has no dedicated image field (see src/content.config.ts),
// so images live as ordinary markdown image references in the body. Matching
// by filename here means the markdown/image mapping itself never has to
// change to fix presentation --- see src/styles/brand.css for the rules these
// classes drive.
//
// Every supplied image is a tall phone-style photo/diagram except one true
// landscape shot. Among the portraits, three are denser diagrams (more
// labels/text) and get a slightly larger cap than the rest.
const LANDSCAPE_FILENAMES = ["week-10-route-example-1"];

const PORTRAIT_DENSE_FILENAMES = [
  "week-05-separation-angle",
  "week-06-vertical-spin",
  "week-07-spin-map",
];

const PORTRAIT_FILENAMES = [
  "week-02-stance",
  "week-02-bridge",
  "week-07-center-side-spin",
  "week-07-high-side-spin",
  "week-07-low-side-spin",
  "week-08-point-positioning",
  "week-08-too-soft",
  "week-08-too-hard",
  "week-09-zone-positioning",
  "week-10-route-positioning",
  "week-10-route-example-2",
  "week-11-safety-route",
];

function classify(src: string): "portrait" | "portrait-dense" | "landscape" | undefined {
  if (LANDSCAPE_FILENAMES.some((name) => src.includes(name))) return "landscape";
  if (PORTRAIT_DENSE_FILENAMES.some((name) => src.includes(name))) return "portrait-dense";
  if (PORTRAIT_FILENAMES.some((name) => src.includes(name))) return "portrait";
  return undefined;
}

// biome-ignore lint: hast nodes are walked structurally rather than typed,
// to avoid adding a hast type dependency for one small plugin.
function visit(node: any): void {
  if (node.type === "element" && node.tagName === "img" && typeof node.properties?.src === "string") {
    const variant = classify(node.properties.src);
    if (variant) {
      const existing: string[] = Array.isArray(node.properties.className)
        ? node.properties.className
        : [];
      node.properties.className = [...existing, "teaching-image", `teaching-image--${variant}`];
    }
  }
  for (const child of node.children ?? []) visit(child);
}

export default function rehypeTeachingImages() {
  return (tree: any) => {
    visit(tree);
  };
}
