// Last updated 2024-03-12

import emojiColors from '../constants/emojiColors.json';

export default getColorForEmoji = (emoji) => {
    return emojiColors[emoji];
}