import { ProjectTypes } from "../Enums";
import {
  ProjectJsonInformations,
  ProjectJsonInformationsLibElem,
} from "../Types/manageProject.jsonInformations";
import { ConstVisuals } from "./const.visuals";

/**
 * @description in this class are stored all the  values and the files names/prefixes
 * - this is a class and not an enum to support also non strings/numeric values.
 */
export class ConstProjects {
  static jsonPathInProjectDirectory = "WTM-PROJECT";
  static jsonProjectsDirectory = "Projects";
  static jsonProjectsFile = "projects.json";
  static jsonProjectFile = "project-info.json";
  static projectAssetsDirectory = "assets"; // the 'assets' directory of each visual
  static projectAssetsCssDirectory = "css"; // the 'css' contains the shared styles between the visuals
  static projectAssetsJsDirectory = "js"; // the 'js' contains the shared scripts between the visuals
  static projectAssetsImgDirectory = "img"; // the 'img'
  static projectAssetsLibDirectory = "lib"; // the 'lib'

  static IdentifierPlaceholderNamePathToProjectDir = "PJ-PATH"; // the path ends without '/'.
  static IdentifierPlaceholderNamePathToProjectAssets = "PJ-ASSETS"; // the path ends without '/'.
  static IdentifierPlaceholderNamePathToProjectAssetsImages =
    "PJ-ASSETS-IMAGES"; // the path ends without '/'.
  static IdentifierPlaceholderNamePathToProjectAssetsJs = "PJ-ASSETS-JS"; // the path ends without '/'.
  static IdentifierPlaceholderNamePathToProjectAssetsCss = "PJ-ASSETS-CSS"; // the path ends without '/'.

  static JsonContent: ProjectJsonInformations = {
    name: "",
    projectType: ProjectTypes.html,
    path: "",
    author: "",
    autorhUrl: "",
    githubRepo: "",
    demoUrl: "",
    assetsAutoImport: false,
    visualsPath: "",
    viewsPath: "",
    scripts: [],
    styles: [],
    visualsDependencies: {},
    lib: {},
  };
  static getProjectsJsonContent(): ProjectJsonInformations {
    return JSON.parse( JSON.stringify( ConstVisuals.JsonContent ) );
  }

  static getVisualsLibElemContent(): ProjectJsonInformationsLibElem {
    return {
      scripts: [], // the lib scripts
      styles: [], // the lib styles
      cdn: {
        scripts: [],
        styles: [],
      },
      url: "",
    };
  }
}
