export const convertBase64 = (file) => {

    return new Promise((resolve, reject) => {

        const fileReader = new FileReader()

        if (file) {

            fileReader.readAsDataURL(file)

        }



        fileReader.onload = () => {

            const base64Res = fileReader.result

            var media = new Audio(fileReader.result);

            media.onloadedmetadata = () => {

                console.log(media.duration, "mediaduration")

            }

            resolve(base64Res)

        }



        fileReader.onerror = (error) => {

            reject(error)

        }

    })

}