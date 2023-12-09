/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["imgfp.hotp.jp","webservice.recruit.co.jp",
                 "lh3.googleusercontent.com","res.cloudinary.com"]
    },
    crossOrigin:{
        origin: "*",
        credentials: true,
    }
}

module.exports = nextConfig
