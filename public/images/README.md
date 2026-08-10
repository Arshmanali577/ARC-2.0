# Photography

Drop real project photography here, then point the matching entry in
`src/content/homepage.ts` at it:

```ts
media: {
  label: "AURELIA — FRONT ELEVATION, DUSK", // kept as the image alt fallback
  tone: "plate-1",
  src: "/images/aurelia-front-elevation.jpg",
  alt: "Aurelia Residence front elevation at dusk",
}
```

`MediaPlate` swaps the hatched placeholder for an optimised `next/image` with
no layout change. Slot sizes used by the design:

| Slot                | Rendered height |
| ------------------- | --------------- |
| Hero                | 720px (fills)   |
| Project cards       | 500px           |
| Practice portrait   | 380px           |
| Testimonial portrait| 400px           |
