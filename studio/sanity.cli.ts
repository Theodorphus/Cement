import {defineCliConfig} from "sanity/cli"
import {DATASET, PROJECT_ID} from "./projekt"

export default defineCliConfig({
  api: {projectId: PROJECT_ID, dataset: DATASET},
  // Studion publiceras på https://ockerocement.sanity.studio
  studioHost: "ockerocement",
  deployment: {autoUpdates: true},
})
