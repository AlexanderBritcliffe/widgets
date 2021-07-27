import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Convert = ({ language, text }) => {
  const [translated, setTranslated] = useState('');
  //new piece of state that will store translated text
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [text]);

  //we want to re run this hook when text prop changes

  useEffect(() => {
    const doTranslation = async () => {
      const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
        params: {
          q: debouncedText,
          target: language.value,
          key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM',
        },
      }
    );

    setTranslated(data.data.translations[0].translatedText);
  };

    doTranslation();

  }, [language, debouncedText]);

  return (
    <div>
      <h1 className="ui header">{translated}</h1>
    </div>
  );


};

export default Convert;

//first empty object after url says that we
// do not want to send any information in the body of the request
//
// q property is text we want to translate which is coming from
// text prop coming into our convert component
//
// target is target language coming from language prop....that prop is entire option object
