const fs = require("fs");
const esbuild = require("esbuild");
const sveltePlugin = require("esbuild-svelte");

//make sure the directoy exists before stuff gets put into it
if (!fs.existsSync("./dist/")) {
  fs.mkdirSync("./dist/");
}

//build the application
esbuild
  .build({
    entryPoints: ["./src/entry.ts"],
    mainFields: ["svelte", "browser", "module", "main"],
    outdir: "./dist",
    format: "esm",
    minify: false, //so the resulting code is easier to understand
    bundle: true,
    watch: true,
    splitting: true,
    sourcemap: "inline",
    plugins: [sveltePlugin()],
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

//use a basic html file to test with
fs.copyFile("./src/index.html", "./dist/index.html", (err) => {
  if (err) throw err;
});
