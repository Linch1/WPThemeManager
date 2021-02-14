import { extensions } from "../../Enums/extension";
import { FileReader, StringComposeReader, StringComposeWriter } from "../../files";
import { View } from "./View";

export class BulkView {
    /**
     * @param VIEWS_FOLDER the folder where the views are contained
     * @param prefix the prefix of the views to read _with or without the dash '-' _
     * @param extension the extension of the visual files ( php, ejs, html etc...) _without the dot_
     */
    constructor(public VIEWS_FOLDER: string, public prefix: string, public extension?: extensions){}

    public getAllViews(): View[]{
        let views: View[] = []; 
        let viewsFolderFiles = FileReader.getFiles(this.VIEWS_FOLDER);
        for ( let viewFile of viewsFolderFiles){
            if(!viewFile.startsWith(this.prefix)) continue;
            let viewNameArr: string[] = viewFile.split(".");
            let extension = viewNameArr.pop() as extensions; // remove the extension from the file name
            if(!StringComposeReader.checkValidExtension(extension)) continue; // if not valid extension skip it
            viewFile = viewNameArr.join(".");
            views.push(new View(this.VIEWS_FOLDER, viewFile, extension));
        }
        return views;
    }
 
}