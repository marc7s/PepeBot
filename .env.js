require('dotenv').config();
const config = {
    "discord": {
        "token": process.env.DISCORD_TOKEN
    },
    "google_cloud": {
        "type": process.env.GOOGLE_CLOUD_TYPE,
        "project_id": process.env.GOOGLE_CLOUD_PROJECT_ID,
        "private_key_id": process.env.GOOGLE_CLOUD_PRIVATE_KEY_ID,
        "private_key": process.env.GOOGLE_CLOUD_PRIVATE_KEY,
        "client_email": process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
        "client_id": process.env.GOOGLE_CLOUD_CLIENT_ID,
        "auth_uri": process.env.GOOGLE_CLOUD_AUTH_URI,
        "token_uri": process.env.GOOGLE_CLOUD_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.GOOGLE_CLOUD_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.GOOGLE_CLOUD_CLIENT_X509_CERT_URL
    },
    "bot": {
        "command_character": ".",
        "voice_channels": {
            oklart: "747185243642921004",
            plugg1: "747223273695346738",
            plugg2: "747389241654509609",
            amongUs: "755702228358004859",
            basen: "756134809692274729",
            team1: "756448642218590208",
            team2: "756448665329074206"
        },
        "text_channels": {
            pepeBot: "751020796410855434",
            schema: "751036640268648478",
            wigwalk: "747218789866799135",
            music: "750644640868204564",
            voice: "751446275047817338",
            mk: "753677504707035267"
        },
        "mk_responses": [
            'LUGNA DIG, NU GÅR DU FÖR LÅNGT',
            'DET DÄR ÄR INTE OKEJ',
            'MOT REGLERNA, STÄNG AV',
            'INGET SÅNT I CHATTEN',
            'TOO FAR, STÄNG NER D-SEKTIONEN',
            'HAN SADE DET, RING POLIS',
            'MEDDELANDE FRÅN DATATEKNOLOGSEKTIONEN IDENTIFIERAT, ÅTGÄRD 10 MIN TIMEOUT VIDTAS'
        ],
        "links": {
            schema: "https://cloud.timeedit.net/chalmers_test/web/public/ri167XQQ545Z50Qv77034gZ6y5Y7201Q5Y85Y1.html",
            wigwalk: "https://www.youtube.com/watch?v=v4-3a6FUOxg"
        },
        "URIs": {
            "rouletteURI": "resources/music/roulette/",
            "songsURI": "resources/music/songs/",
            "pepeURI": "resources/pepes/"
        },
        "emotes": {
            PepeSmug: 'PepeSmug',
            HYPERDANSGAME: 'HYPERDANSGAME',
            Sadge: 'Sadge',
            FeelsBadMan: 'FeelsBadMan'
        },
        "presence": {
            activity: {
                name: 'nakna pepes',
                type: 'WATCHING'
            }
        },
        "calendar": {
            "icsURL": "https://cloud.timeedit.net/chalmers_test/web/public/ri617Q7QYn3ZQ4Q501664875yZZQ5704.ics"
        }
    }
}

module.exports = {
    config
};