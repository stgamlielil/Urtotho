# ממיר עברית וסורית ל Android

זהו פרויקט Expo שעוטף את קובץ ה HTML המקורי בתוך WebView ושומר את לוגיקת ההמרה הקיימת.

## בנייה דרך GitHub ו Expo

1. העלה את קובץ הפרויקט ZIP לריפוזיטורי GitHub חדש.
2. צור ב GitHub את הקובץ `.github/workflows/setup.yml` מתוכן קובץ ה setup המצורף בנפרד והריץ את הפעולה `Prepare Expo project` פעם אחת.
3. ב Expo צור Access Token.
4. ב GitHub פתח Settings, אחר כך Secrets and variables, אחר כך Actions, וצור Repository secret בשם `EXPO_TOKEN`.
5. עבור ל Actions והריץ `Build Android APK`.
6. בסיום, פתח את קישור ה Build של Expo והורד את קובץ ה APK.

חשוב: חשבון Expo שהוגדר בפרויקט הוא `stgamlielils-team`. ה slug הוא `syriac-hebrew-converter`.
