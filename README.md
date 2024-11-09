# خطوات اللعب

## 1. تسجيل الدخول
- يبدأ اللاعب بتسجيل الدخول إلى اللعبة باستخدام حسابه.
- يمكن للاعب اختيار اللعب **مع صديق** أو **بدون صديق**.
  
## 2. اختيار وضع اللعب
- **اللعب مع صديق**:
  - سيتم إنشاء غرفة للعبة.
  - يتم توليد **كود الغرفة** الذي يجب على اللاعب مشاركته مع اللاعب الآخر للانضمام.
  - لا يمكن للاعب الأول البدء في اللعبة حتى ينضم اللاعب الآخر للغرفة.
  - **الغرفة** تحتوي على لاعبين فقط (لا يمكن لأكثر من لاعبين الدخول في نفس الغرفة).

- **اللعب بدون صديق**:
  - يبدأ اللاعب بمفرده في اللعبة مع خصم (نظام الذكاء الاصطناعي).

## 3. بدء اللعبة
- كل لاعب يبدأ بـ **5 نقاط**.
- **اللاعب الأول** يبدأ بإدخال جمله  في اللعبة.
- **اللاعب الأول** يحصل على **15 ثانية** لإدخال الجملة.
  - إذا لم يتمكن من إدخال الجملة في الوقت المحدد، يخسر **نقطة واحدة**.
  
## 4. اختيار الكلمة للإعراب
- بعد إدخال الجملة، يقوم **النظام** باختيار كلمة عشوائية من الجملة لإعرابها.
- يُمنح اللاعب **15 ثانية** لإعراب الكلمة المحددة.

## 5. تقييم الإعراب
- **النموذج (المودل)** يقوم بتقييم الإعراب المقدم من اللاعب:
  - إذا كان الإعراب صحيحًا، يتم توجيه السؤال إلى اللاعب الثاني، ويختار هو بدوره الاعراب الصحيح لهذه الجمله.
  - إذا كان الإعراب خاطئًا، يخسر اللاعب الأول **نقطة واحدة**، لكن المودل سيقوم بتصحيح الإعراب وتوضيح الخطأ للاعب .

 ## 6. فرصة اللاعب الثاني لإدخال جملة:
- في حالة أن اللاعب الأول أخطأ في الإعراب، يمنح **النظام** **اللاعب الثاني** الفرصة لإدخال جملة جديدة.
- ثم يتم اختيار كلمةعشوائية ليقوم بإعرابها.

## 7. استمرارية اللعب
- يستمر التحدي بين اللاعبين بالتناوب.
- كل لاعب يحاول إعطاء إعراب صحيح للكلمات العشوائية المختارة.
- إذا أخطأ اللاعب في الإعراب، يخسر **نقطة واحدة**، وإذا كانت الإجابة صحيحة، يتم تقديم التحدي للاعب الآخر.

## 8. نهاية اللعبة
- تنتهي اللعبة عندما **تنفد نقاط** أحد اللاعبين (الوصول إلى 0 نقطة).
- اللاعب الذي يمتلك نقاطًا أعلى في النهاية هو الفائز.


## 9. تقييم النموذج وتصحيح الإعراب
- يقوم المودل بمراجعة وتصحيح إعراب اللاعبين.
- إذا كان الإعراب خاطئًا، سيقوم النموذج بتصحيحه وتعليم اللاعب كيف يكون الإعراب الصحيح.

## دور المودل:
- المودل هو المسؤول عن تقييم الإجابات وإعطاء التغذية الراجعة الصحيحة. إذا كانت إجابة اللاعب خاطئة، يقوم المودل بتصحيح الإعراب وتوضيح الخطأ بشكل فوري. هذا يساعد الطلاب على تحسين مهاراتهم في الإعراب بشكل سريع ودقيق.

## أهداف اللعبة
- تعزيز مهارات الإعراب من خلال تطبيق القواعد النحوية بشكل عملي.
- التفاعل والتنافس بين اللاعبين لتحفيزهم على الإجابة الصحيحة.
- توفير تغذية راجعة فورية لتعزيز تعلم القواعد النحوية، حيث يقوم النظام بتقييم الإجابات والتأكد من صحتها، مما يساعد الطلاب على تعلم الأخطاء وتصحيحها بشكل سريع.
- تعلم القواعد النحوية في بيئة لعب ممتعة وغير تقليدية.


## خلاصة:
بالتالي، تعتبر اللعبة أداة تعليمية مبتكرة لتحسين مهارات الطلاب في الإعراب بطريقة ممتعة وفعّالة. من خلال التفاعل مع الجمل واختبار مهاراتهم في الإعراب، يتعلم الطلاب القواعد النحوية ويصقلون قدراتهم على التحليل اللغوي بشكل سهل ومشوق.





















This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:



### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

