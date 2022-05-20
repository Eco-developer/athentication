import path from "path";
import fs from "fs";
import Handlebars from "handlebars";

export const createEmail = (templatePath: string, variables: any) => {
    const root_dir = __dirname.split('\dist')[0];
    try {
        const filePath = path.join(root_dir, templatePath);
        const source = fs.readFileSync(filePath, 'utf-8').toString();
        const template = Handlebars.compile(source);
       
        const htmlToSend = template(variables);
        return {
            data: htmlToSend,
            error: false,
        };
    } catch (error) {
        console.log(error)
        return { 
            error: true,
            data: null,
        }
    }
    
}
