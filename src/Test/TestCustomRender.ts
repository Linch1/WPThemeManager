import {View} from "../Entities/rendernig-custom/View";

let view = new View("/home/pero/projects/WTM/LIB", "home");
/**
 * @description class to perform tests on the lib
 */
class TestCustomRender {
  constructor() {}

  static createView() {
    view.create();
  }
  static addBlockInTemplate() {
    view.addBlock({
        identifier_name: "BODY",
        blockName: "PRIMO-DIV",
        open: "<div id='ciao-PRIMO' class='come' >",
        close: "</div>",
      });
      view.addBlock({
        identifier_name: "PRIMO-DIV",
        blockName: "SECONDO-DIV",
        open: "<div id='ciao-SECONDO' class='come' >",
        close: "</div>",
      });
   
  }
  static includeFileInTemplate() {
    view.includeRelative("BODY", "/partials/BODY");
    view.includeRelative("PRIMO-DIV", "/partials/PRIMO-DIV");
  }

  static delete() {
    view.delete();
  }


}

export { TestCustomRender };