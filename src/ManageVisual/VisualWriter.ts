import { FileWriter } from "../files/FileWriter";
import { FileReader } from "../files/FileReader";
import { visualJsonIdentifiers } from "../Types/entity.visual.jsons";
import { Identifiers } from "../Identifiers/Identifiers";
import { Visual } from "./Visual";
import { identifierActions, identifierType, renderTypes } from "../Enums";

class VisualWriter {

  public ERR_NOT_RENDER_IDENTIFIER = "During the population of the identifier was found a non registered RENDER identifier, check the enum renderTypes."

  constructor(public visual: Visual) {}

  /**
   * @description create the visual directory and populate it with the main files [render.html, default.html, identifiers.json]
   * @returns string: the path to the visual folder
   */
  public createVisual(): string {
    let visualPath = this.visual.getDirPath();
    if (FileReader.existsPath(visualPath)) {
      throw new Error(this.visual.ERR_VISUAL_ALREADY_EXISTS);
    }
    FileWriter.createDirectory(visualPath);
    FileWriter.createFile(
      this.visual.RENDER_FILE_PATH,
      this.visual.INIT_RENDER_FILE_CONTENT
    );
    FileWriter.createFile(
      this.visual.DEFAULT_FILE_PATH,
      this.visual.INIT_DEFAULT_FILE_CONTENT
    );
    this.saveJson();
    return visualPath;
  }

  public saveJson() {
    FileWriter.writeFile(
      this.visual.JSON_FILE_PATH,
      JSON.stringify(this.visual.JSON_FILE_CONTENT)
    );
  }

  /**
   * @description populate the WTM.json file of the given visual with the identifiers contained in default.##
   * - default.## should contain **only** HTML identifiers
   */
  public populateIdentifiers() {
    if(!this.visual.isCreated()) throw new Error(this.visual.ERR_VISUAL_NOT_CREATED);
    
    let identifiersJson: visualJsonIdentifiers = this.visual.JSON_FILE_CONTENT.identifiers;
    let identfiers: string[] = Identifiers.getContainedIdentifiers(
      this.visual.DEFAULT_FILE_PATH,
      identifierActions.ALL
    );
    for (let _knownIdentifier in identifiersJson){
      for (let foundIdentifier of identfiers) {
        
        let [TYPE, ACTION, NAME] = Identifiers.getIdentifierTypeActionName(foundIdentifier);
        if( ! (TYPE in renderTypes ) ) {
          throw new Error(this.ERR_NOT_RENDER_IDENTIFIER);
        }
        // this line give errors from typesscripèt but it's sure that the TYPE is of type renderType ( for the upper 'if' check )
        // and the ACTION is for sure a key of the json becouse it is built to have all the ACTIONS as key for each TYPE (renderType)
        //@ts-ignore
        identifiersJson[TYPE][ACTION][NAME] = "";
      }
    }
    FileWriter.writeFile(
      this.visual.JSON_FILE_PATH,
      JSON.stringify(this.visual.JSON_FILE_CONTENT)
    );
  }

  /**
   * @description replace the current default html with the passed one
   * @param newHtml the new html to use
   */
  public editDefaultHtml(newHtml: string){
    if(!this.visual.isCreated()) throw new Error(this.visual.ERR_VISUAL_NOT_CREATED);

    FileWriter.writeFile(this.visual.DEFAULT_FILE_PATH, newHtml);
  }

}

export { VisualWriter };
