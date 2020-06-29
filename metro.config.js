const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
    const {
      resolver: { sourceExts, assetExts }
    } = await getDefaultConfig();
    assetExts.push("model", "obj", "mtl", "gltf", "glb", "dae"); // for 3d models - add unusual extensions here
    return {
      transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
        assetPlugins: ['expo-asset/tools/hashAssetFiles']
      },
      resolver: {
        assetExts: assetExts.filter(ext => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"]
      }
    };
  })();