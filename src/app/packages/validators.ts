import { NgForm } from "@angular/forms";

export class ValidatorForm {

    validation(loginForm: NgForm) {
        let validation = []
        for (const key in loginForm.controls!) {
            loginForm.controls![key].status === "VALID" ? () => { validation.push("VALID") } : validation.push("INVALID")
        }
        return !validation.includes("INVALID")
    }

    equalValidation(password1: string, password2: string): boolean {
        if (password1 === password2) {
            return true
        }
        return false
    }

    fileType(file: any) {
        if (file.type == "text/csv") {
            return true
        }
        return false
    }

    fileSize(file: any, maxSize: number) {
        if (Number.parseInt((file.size / (1024*1024)).toFixed(2)) <= maxSize) {
            return true
        }
        return false
    }

}