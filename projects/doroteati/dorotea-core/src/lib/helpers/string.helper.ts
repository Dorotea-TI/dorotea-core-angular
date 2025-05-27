export class StringHelper {

    static isImage(filename: string): boolean {
        let extension = StringHelper.getExtension(filename);
        if(extension == 'jpg'||extension == 'jpeg'||extension == 'png'||extension == 'gif'||extension == 'svg'){
            return true;
        }
        return false;
    }

    static isVideo(filename: string): boolean {
        let extension = StringHelper.getExtension(filename);
        if(extension == 'mov'||extension == 'mp4'||extension == 'mkv'||extension == 'm4v'||extension == 'avi'){
            return true;
        }
        return false;
    }

    static getExtension(filename: string): string | undefined {
        if(filename == undefined){
            return '';
        }
        return filename.toLowerCase().split('.').pop();
    }

    static isValidEmail(email: string): boolean {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)){
          return true;
        }
        return false;
    }
}