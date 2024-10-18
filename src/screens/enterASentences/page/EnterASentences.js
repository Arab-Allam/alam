import React, { useState, useEffect } from "react";
import { Text, TextInput, View, Modal, Pressable } from "react-native";
import Images from "../../../component/Images";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Font } from "../../../../assets/fonts/Fonts";
import MyButton from "../../../component/MyButton";

const EnterASentences = () => {
  const [sentence, setSentence] = useState("");
  const [wordArray, setWordArray] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isWordModalVisible, setIsWordModalVisible] = useState(false);
  const [randomWord, setRandomWord] = useState("");
  const [wordInput, setWordInput] = useState("");
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [wordModalTimeLeft, setWordModalTimeLeft] = useState(20);
  const [apiResult, setApiResult] = useState(null);

  let timerId;

  useEffect(() => {
    if (timeLeft > 0 && !isInputDisabled) {
      timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsInputDisabled(true);
      setIsTimeUp(true);
      handleSendSentence();
      setTimeout(() => {
        setIsModalVisible(true);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [timeLeft, isInputDisabled]);

  useEffect(() => {
    if (isWordModalVisible && wordModalTimeLeft > 0) {
      const wordTimerId = setTimeout(() => {
        setWordModalTimeLeft(wordModalTimeLeft - 1);
      }, 1000);

      return () => clearTimeout(wordTimerId);
    } else if (wordModalTimeLeft === 0) {
      setIsWordModalVisible(false);
      setWordModalTimeLeft(20);
    }
  }, [isWordModalVisible, wordModalTimeLeft]);

  const handleSendSentence = async () => {
    const trimmedSentence = sentence.trim();
    const words = trimmedSentence.split(" ");
    setWordArray(words);
  
    console.log("Sending data to API:");
    console.log("Sentence:", trimmedSentence);
    console.log("Random Word:", randomWord);
    console.log("User's Irab:", wordInput);
  
    try {
      const response = await fetch('http://127.0.0.1:8000/run-model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sentence: trimmedSentence,
          word: randomWord,
          irab: wordInput,
        }),
      });
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error("Error in handleSendSentence:", error);
    }
  };

  const handleButtonPress = () => {
    if (!isInputDisabled) {
      setIsInputDisabled(true);
      clearTimeout(timerId);
      handleSendSentence();
      showRandomWord();
    }
  };

  const showRandomWord = () => {
    if (sentence.trim()) {
      const words = sentence.split(" ");
      const randomIndex = Math.floor(Math.random() * words.length);
      setRandomWord(words[randomIndex]);
      setIsWordModalVisible(true);
      setWordModalTimeLeft(20);
    }
  };

  const handleWordSubmit = () => {
    console.log("User entered word:", wordInput);
    setIsWordModalVisible(false);
    handleSendSentence();
    setWordInput("");
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsTimeUp(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Images
          imageURL={require("../../../../assets/images/bg.png")}
          imageStyle={{
            width: responsiveScreenWidth(100),
            height: responsiveHeight(100),
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Images
          imageURL={require("../../../../assets/images/Group2.png")}
          imageStyle={{
            width: responsiveScreenWidth(82),
            height: responsiveHeight(72),
            alignSelf: "center",
            borderRadius: responsiveFontSize(1.4),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            position: "absolute",
            width: responsiveScreenWidth(77),
            height: responsiveHeight(65),
            borderRadius: responsiveFontSize(1.4),
          }}
        >
          <Text
            style={{
              position: "absolute",
              top: responsiveHeight(5.7),
              left: responsiveWidth(5),
              fontSize: responsiveFontSize(1.6),
              color: timeLeft <= 5 ? "red" : "black",
              fontFamily: Font.bold,
            }}
          >
            {timeLeft}s
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              alignContent: "flex-start",
              alignSelf: "flex-start",
              marginVertical: responsiveHeight(5),
            }}
          >
            <Text style={{ fontSize: responsiveFontSize(2), fontFamily: Font.bold }}>
              يلا نلعب
            </Text>
            <Text
              style={{
                fontSize: responsiveFontSize(1),
                fontFamily: Font.bold,
                color: "#5766CC",
              }}
            >
              إدخــل جــمـلـة مــفــيـدة وتـحــدى فـيــها الخـــــصم🤩✨
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: responsiveHeight(9),
                  right: responsiveScreenWidth(2),
                  zIndex: 1,
                  borderRadius: 100,
                  backgroundColor: "#FFFFFF",
                  width: responsiveScreenWidth(11),
                  height: responsiveHeight(4),
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    color: "#6CBFF8",
                    fontSize: responsiveFontSize(1.1),
                    textAlign: "center",
                    borderRadius: 50,
                    paddingHorizontal: responsiveWidth(1),
                    fontFamily: Font.bold,
                  }}
                >
                  أدخل الجملة
                </Text>
              </View>
              <TextInput
                style={{
                  backgroundColor: "#E7E7E7E5",
                  width: responsiveHeight(75),
                  height: responsiveHeight(15),
                  borderRadius: 40,
                  fontSize: responsiveFontSize(2),
                  paddingHorizontal: responsiveWidth(2),
                  textAlign: "right",
                }}
                value={sentence}
                onChangeText={setSentence}
                placeholder="أدخل الجملة هنا"
                editable={!isInputDisabled}
              />
            </View>
            <View>
              <MyButton
                ButtonName="ارسال"
                op={handleButtonPress}
                disabled={isInputDisabled}
              />
            </View>
          </View>
        </View>
      </View>

      <Modal
        visible={isModalVisible && isTimeUp}
        supportedOrientations={["landscape"]}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: responsiveWidth(70),
              padding: responsiveWidth(5),
              backgroundColor: "#fff",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontFamily: Font.bold,
                marginBottom: 20,
              }}
            >
              انتهى الوقت ⏰ لقد خسرت نقطة
            </Text>
            <Pressable
              onPress={closeModal}
              style={{
                backgroundColor: "#6CBFF8",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontFamily: Font.bold,
                  color: "#fff",
                }}
              >
                موافق
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isWordModalVisible}
        supportedOrientations={["landscape"]}
        transparent={true}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: responsiveWidth(70),
              padding: responsiveWidth(5),
              backgroundColor: "#fff",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontFamily: Font.bold,
                marginBottom: 20,
              }}
            >
              أعرب كلمة : {randomWord}
            </Text>
            <TextInput
              style={{
                backgroundColor: "#E7E7E7E5",
                width: responsiveHeight(75),
                height: responsiveHeight(10),
                borderRadius: 40,
                fontSize: responsiveFontSize(2),
                paddingHorizontal: responsiveWidth(2),
                textAlign: "right",
                marginBottom: 20,
              }}
              value={wordInput}
              onChangeText={setWordInput}
              placeholder="اعرب الكلمة هنا"
            />
            <Text style={{ fontSize: responsiveFontSize(1), marginBottom: 10 }}>
              {wordModalTimeLeft}s left
            </Text>
            <Pressable
              onPress={handleWordSubmit}
              style={{
                backgroundColor: "#DB6704",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(1.2),
                  fontFamily: Font.bold,
                  color: "#fff",
                }}
              >
                ارسل الكلمة
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={apiResult !== null}
        supportedOrientations={["landscape"]}
        transparent={true}
        animationType="fade"
      >
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}>
          <View style={{
            width: responsiveWidth(80),
            padding: responsiveWidth(5),
            backgroundColor: "#fff",
            borderRadius: 10,
            alignItems: "center",
          }}>
            <Text style={{
              fontSize: responsiveFontSize(2),
              fontFamily: Font.bold,
              marginBottom: 20,
            }}>
              نتيجة التحليل
            </Text>
            {apiResult && apiResult.error ? (
              <Text style={{ color: 'red', textAlign: 'center' }}>{apiResult.error}</Text>
            ) : (
              <>
                <Text>الجملة: {apiResult?.sentence}</Text>
                <Text>الكلمة: {apiResult?.word}</Text>
                <Text>الإعراب: {apiResult?.irab}</Text>
                <Text>التحليل: {apiResult?.analysis}</Text>
              </>
            )}
            <Pressable
              onPress={() => setApiResult(null)}
              style={{
                backgroundColor: "#6CBFF8",
                padding: 10,
                borderRadius: 5,
                marginTop: 20,
              }}
            >
              <Text style={{
                fontSize: responsiveFontSize(1.2),
                fontFamily: Font.bold,
                color: "#fff",
              }}>
                إغلاق
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default EnterASentences;