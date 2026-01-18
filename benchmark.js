const fs = require("fs");
const ejs = require("ejs");
const { Suite } = require("benchmark");

// load template
const template = fs.readFileSync("template_benchmark.ejs", "utf-8");

// compile template sekali
const compiled = ejs.compile(template);

const data = {
  title: "Benchmark EJS",
  name: "User",
  items: Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)
};

const suite = new Suite();

suite
  .add("EJS render (compile setiap kali)", () => {
    ejs.render(template, data);
  })
  .add("EJS render (pakai compile cached)", () => {
    compiled(data);
  })
  .on("cycle", (event) => {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Paling cepat: " + this.filter("fastest").map("name"));
  })
  .run();
