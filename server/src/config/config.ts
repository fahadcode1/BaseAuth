import dotenv from "dotenv"

dotenv.config()

interface Config {
    port: number
    nodeEnv: string
    mongoUri: string
    jwtAccessSecret: string
    jwtAccessExpiresIn: string
    jwtRefreshSecret: string
    jwtRefreshExpiresIn: string
    gmailUser: string
    gmailAppPass: string
}

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || '',
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || '',
    jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || '',
    jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    gmailUser: process.env.GMAIL_USER || '',
    gmailAppPass: process.env.GMAIL_APP_PASS || '',
}

// Critical vars ke liye validation — agar missing ho to startup pe hi crash kar do
const requiredVars: (keyof Config)[] = ['mongoUri', 'jwtAccessSecret', 'jwtRefreshSecret']

for (const key of requiredVars) {
    if (!config[key]) {
        throw new Error(`Missing required env variable for: ${key}`)
    }
}

export default config