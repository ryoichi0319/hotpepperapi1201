/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["imgfp.hotp.jp","webservice.recruit.co.jp",
                 "lh3.googleusercontent.com","res.cloudinary.com"]
    }, 
    headers:{
        origin: "*",
        methods: ["GET", "POST", "OPTIONS"],
        headers: ["Content-Type", "Authorization"],
    
    }

}

module.exports = nextConfig
