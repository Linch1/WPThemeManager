import { StringComposeWriter } from "../../files/StringComposeWriter";
import { ThemeAux } from "../../ManageTheme/ThemeAux";
import { FileWriter } from "../../files/FileWriter";
import { WpFunctionComposer } from "../../files/WpFunctionComposer";
import { customPartType } from "../../Enums/entities.wp.type";
import { InterfaceWpEntity } from "../../Interfaces/entity.wp.InterfaceGeneralWpEntity";
import { IdentifierImport } from "../../Identifiers/IdentifierImport";

export class GeneralWpEntity<T extends {skipIfExists?: boolean;}> implements InterfaceWpEntity {
  
  public readonly ERR_NO_VALID_INFORMATIONS = "ERR: the informations attribute of this class are not correctly initalized";
  public readonly ERR_ALREADY_PRESENT = "ERR: The custom part area already exists";
  public readonly ERR_INVALID_TYPE = "ERR: The custom part has an invalid type"

  public PARENT_DIR_PATH: string = "";
  public DEFAULT_BUILD_PATH: string = "";
  protected FILE_NAME = "";
  protected JSON_PATH = "";
  protected JSON_FILE_PATH = "";
  protected IDENTIFIER_NAME = "";
  protected CUSTOM_PART_NAME = "";
  protected CUSTOM_PART_TYPE: customPartType = customPartType.NONE

  /**
   * @description intialize the class
   * @param themeAux
   * @param informations the field pageName should also be a valid function name
   */
  constructor(public themeAux: ThemeAux, protected informations: T) {}

  /**
   * @description create the needed file/directories
   */
  initialize(): void{
    this.createJsonDirectory();
    this.createDirectory();
  }
  
  /**
   * @description delete the all the relative files
   */
  public delete(): void{
    FileWriter.removeFile(this.getPath());
    FileWriter.removeFile(this.getPathJson());
  }

  /**
   * @description checks if the post types informations are valid, returns true or false
   */
  public validInformations(): boolean {
    let valid = true;
    for (let key in this.getInformations) {
      if (key == "skipIfExists") continue;
      else valid = !!this.getInformations[key] && valid;
    }
    return valid;
  }

  /**
   * @description return the name of the function used to import files of structure(html)/styles(.css) in the given WpEntity
   * @param page the menu page where to import the files
   */
  public renderFileFunction(page: string): string {
    return `render_file_${page}`;
  }

  /**
   * @description get the path to the dircetory that contains the WpEntity
   */
  getDirectory(): string {
    return this.themeAux.getInsideThemeAssetsPath(this.PARENT_DIR_PATH);
  }
  /**
   * @description creates the element directory
   */
  public createDirectory() {
    FileWriter.createDirectory(this.getDirectory());
  }
  /**
   * @description get the path to a file inside the WpEntity's directory
   * @param file the file for which retrive the path
   */
  public getInsideDirectory(file: string): string {
    return StringComposeWriter.concatenatePaths(this.getDirectory(), file);
  }
  /**
   * @description get the absolute path to the main file of the WpEntity
   */
  public getPath(): string {
    return this.getInsideDirectory(
      this.CUSTOM_PART_NAME + "-" + this.FILE_NAME
    );
  }
  /**
   * @description returns the absolute path of the json file that contains the relevant informations of the WpEntity
   */
  public getPathJson(): string {
    return this.JSON_FILE_PATH;
  }
  /**
   * @description creates the json directory
   */
  public createJsonDirectory(): void {
    FileWriter.createDirectory(this.JSON_PATH);
  }
  /**
   * @description save the informations of the WpEntity
   */
  public saveJson(): void {
    FileWriter.writeFile(
      this.getPathJson(),
      JSON.stringify(this.getInformations)
    );
  }
  /**
   * @description import the current WpEntity in the theme
   */
  public import() {
    if(this.CUSTOM_PART_TYPE === customPartType.NONE) throw new Error(this.ERR_INVALID_TYPE);
    if (!this.validInformations())
      throw new Error(this.ERR_NO_VALID_INFORMATIONS);
    let requireFunction = WpFunctionComposer.requirePhpFile(
      StringComposeWriter.concatenatePaths(this.PARENT_DIR_PATH, this.CUSTOM_PART_NAME)
    );
    StringComposeWriter.appendBeetweenChars(
      this.themeAux.THEME_FUNCTIONS_FILE,
      requireFunction,
      IdentifierImport.getIdentifierPairJsComment(this.IDENTIFIER_NAME)[0],
      IdentifierImport.getIdentifierPairJsComment(this.IDENTIFIER_NAME)[1]
    );
    this.themeAux.updateJsonFunctions(this.CUSTOM_PART_TYPE, requireFunction, -1, this.getInformations.skipIfExists);
  }
  /**
   * @description create the  WpEntity
   */
  create(): void {
    throw new Error("Method not implemented.");
  }

  public set setInformations(newInformations: T) {
    this.informations = newInformations;
  }
  public get getInformations(): T {
    return this.informations;
  }

}
