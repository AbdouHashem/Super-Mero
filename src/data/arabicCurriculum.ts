export interface ArabicLetter {
  id: string;
  letter: string;
  name: string;
  fatha: string;
  kasra: string;
  damma: string;
  sukoon: string;
  maddAlif: string;
  maddWaw: string;
  maddYaa: string;
  initialForm: string;
  medialForm: string;
  finalForm: string;
  exampleWord: string;
  emoji: string;
  exampleSentence: string;
}

export const ARABIC_LETTERS: ArabicLetter[] = [
  { id: 'alif', letter: 'أ', name: 'الأَلِف', fatha: 'أَ', kasra: 'إِ', damma: 'أُ', sukoon: 'أْ', maddAlif: 'آ', maddWaw: 'أُو', maddYaa: 'إِي', initialForm: 'أَ', medialForm: 'ـأَ', finalForm: 'ـأ', exampleWord: 'أَسَدٌ', emoji: '🦁', exampleSentence: 'أَسَدٌ مَلِكُ الْغَابَةِ' },
  { id: 'baa', letter: 'ب', name: 'الْبَاء', fatha: 'بَ', kasra: 'بِ', damma: 'بُ', sukoon: 'بْ', maddAlif: 'بَا', maddWaw: 'بُو', maddYaa: 'بِي', initialForm: 'بَـ', medialForm: 'ـبَـ', finalForm: 'ـب', exampleWord: 'بَيْتٌ', emoji: '🏠', exampleSentence: 'بَيْتٌ جَمِيلٌ وَدَافِئٌ' },
  { id: 'taa', letter: 'ت', name: 'التَّاء', fatha: 'تَ', kasra: 'تِ', damma: 'تُ', sukoon: 'تْ', maddAlif: 'تَا', maddWaw: 'تُو', maddYaa: 'تِي', initialForm: 'تَـ', medialForm: 'ـتَـ', finalForm: 'ـت', exampleWord: 'تُفَّاحٌ', emoji: '🍎', exampleSentence: 'تُفَّاحٌ أَحْمَرُ لَذِيذٌ' },
  { id: 'thaa', letter: 'ث', name: 'الثَّاء', fatha: 'ثَ', kasra: 'ثِ', damma: 'ثُ', sukoon: 'ثْ', maddAlif: 'ثَا', maddWaw: 'ثُو', maddYaa: 'ثِي', initialForm: 'ثَـ', medialForm: 'ـثَـ', finalForm: 'ـث', exampleWord: 'ثَعْلَبٌ', emoji: '🦊', exampleSentence: 'ثَعْلَبٌ ذَكِيٌّ يَجْرِي' },
  { id: 'jeem', letter: 'ج', name: 'الْجِيم', fatha: 'جَ', kasra: 'جِ', damma: 'جُ', sukoon: 'جْ', maddAlif: 'جَا', maddWaw: 'جُو', maddYaa: 'جِي', initialForm: 'جَـ', medialForm: 'ـجَـ', finalForm: 'ـج', exampleWord: 'جَمَلٌ', emoji: '🐪', exampleSentence: 'جَمَلٌ صَبُورٌ فِي الصَّحْرَاءِ' },
  { id: 'haa', letter: 'ح', name: 'الْحَاء', fatha: 'حَ', kasra: 'حِ', damma: 'حُ', sukoon: 'حْ', maddAlif: 'حَا', maddWaw: 'حُو', maddYaa: 'حِي', initialForm: 'حَـ', medialForm: 'ـحَـ', finalForm: 'ـح', exampleWord: 'حِصَانٌ', emoji: '🐴', exampleSentence: 'حِصَانٌ سَرِيعٌ فِي الْمَرْعَى' },
  { id: 'khaa', letter: 'خ', name: 'الْخَاء', fatha: 'خَ', kasra: 'خِ', damma: 'خُ', sukoon: 'خْ', maddAlif: 'خَا', maddWaw: 'خُو', maddYaa: 'خِي', initialForm: 'خَـ', medialForm: 'ـخَـ', finalForm: 'ـخ', exampleWord: 'خَرُوفٌ', emoji: '🐑', exampleSentence: 'خَرُوفٌ أَبْيَضُ صَغِيرٌ' },
  { id: 'dal', letter: 'د', name: 'الدَّال', fatha: 'دَ', kasra: 'دِ', damma: 'دُ', sukoon: 'دْ', maddAlif: 'دَا', maddWaw: 'دُو', maddYaa: 'دِي', initialForm: 'دَ', medialForm: 'ـدَ', finalForm: 'ـد', exampleWord: 'دِيكٌ', emoji: '🐓', exampleSentence: 'دِيكٌ يَصِيحُ فِي الصَّبَاحِ' },
  { id: 'dhal', letter: 'ذ', name: 'الذَّال', fatha: 'ذَ', kasra: 'ذِ', damma: 'ذُ', sukoon: 'ذْ', maddAlif: 'ذَا', maddWaw: 'ذُو', maddYaa: 'ذِي', initialForm: 'ذَ', medialForm: 'ـذَ', finalForm: 'ـذ', exampleWord: 'ذَهَبٌ', emoji: '🪙', exampleSentence: 'ذَهَبٌ يَلْمَعُ كَالنُّجُومِ' },
  { id: 'raa', letter: 'ر', name: 'الرَّاء', fatha: 'رَ', kasra: 'رِ', damma: 'رُ', sukoon: 'رْ', maddAlif: 'رَا', maddWaw: 'رُو', maddYaa: 'رِي', initialForm: 'رَ', medialForm: 'ـرَ', finalForm: 'ـر', exampleWord: 'رُمَّانٌ', emoji: '🫐', exampleSentence: 'رُمَّانٌ حُلْوٌ وَمُفِيدٌ' },
  { id: 'zay', letter: 'ز', name: 'الزَّاي', fatha: 'زَ', kasra: 'زِ', damma: 'زُ', sukoon: 'زْ', maddAlif: 'زَا', maddWaw: 'زُو', maddYaa: 'زِي', initialForm: 'زَ', medialForm: 'ـزَ', finalForm: 'ـز', exampleWord: 'زَهْرَةٌ', emoji: '🌸', exampleSentence: 'زَهْرَةٌ تَتَفَتَّحُ فِي الْحَدِيقَةِ' },
  { id: 'seen', letter: 'س', name: 'السِّين', fatha: 'سَ', kasra: 'سِ', damma: 'سُ', sukoon: 'سْ', maddAlif: 'سَا', maddWaw: 'سُو', maddYaa: 'سِي', initialForm: 'سَـ', medialForm: 'ـسَـ', finalForm: 'ـس', exampleWord: 'سَمَكَةٌ', emoji: '🐟', exampleSentence: 'سَمَكَةٌ تَسْبَحُ فِي الْبَحْرِ' },
  { id: 'sheen', letter: 'ش', name: 'الشِّين', fatha: 'شَ', kasra: 'شِ', damma: 'شُ', sukoon: 'شْ', maddAlif: 'شَا', maddWaw: 'شُو', maddYaa: 'شِي', initialForm: 'شَـ', medialForm: 'ـشَـ', finalForm: 'ـش', exampleWord: 'شَمْسٌ', emoji: '☀️', exampleSentence: 'شَمْسٌ مُشْرِقَةٌ تُنِيرُ السَّمَاءَ' },
  { id: 'sad', letter: 'ص', name: 'الصَّاد', fatha: 'صَ', kasra: 'صِ', damma: 'صُ', sukoon: 'صْ', maddAlif: 'صَا', maddWaw: 'صُو', maddYaa: 'صِي', initialForm: 'صَـ', medialForm: 'ـصَـ', finalForm: 'ـص', exampleWord: 'صَقْرٌ', emoji: '🦅', exampleSentence: 'صَقْرٌ يُحَلِّقُ عَالِياً' },
  { id: 'dad', letter: 'ض', name: 'الضَّاد', fatha: 'ضَ', kasra: 'ضِ', damma: 'ضُ', sukoon: 'ضْ', maddAlif: 'ضَا', maddWaw: 'ضُو', maddYaa: 'ضِي', initialForm: 'ضَـ', medialForm: 'ـضَـ', finalForm: 'ـض', exampleWord: 'ضِفْدَعٌ', emoji: '🐸', exampleSentence: 'ضِفْدَعٌ أَخْضَرُ يَقْفِزُ' },
  { id: 'taa2', letter: 'ط', name: 'الطَّاء', fatha: 'طَ', kasra: 'طِ', damma: 'طُ', sukoon: 'طْ', maddAlif: 'طَا', maddWaw: 'طُو', maddYaa: 'طِي', initialForm: 'طَـ', medialForm: 'ـطَـ', finalForm: 'ـط', exampleWord: 'طَائِرٌ', emoji: '🐦', exampleSentence: 'طَائِرٌ يُغَرِّدُ فَوْقَ الشَّجَرَةِ' },
  { id: 'zaa2', letter: 'ظ', name: 'الظَّاء', fatha: 'ظَ', kasra: 'ظِ', damma: 'ظُ', sukoon: 'ظْ', maddAlif: 'ظَا', maddWaw: 'ظُو', maddYaa: 'ظِي', initialForm: 'ظَـ', medialForm: 'ـظَـ', finalForm: 'ـظ', exampleWord: 'ظَرْفٌ', emoji: '✉️', exampleSentence: 'ظَرْفُ رِسَالَةٍ مُمْتِعَةٍ' },
  { id: 'ayn', letter: 'ع', name: 'الْعَيْن', fatha: 'عَ', kasra: 'عِ', damma: 'عُ', sukoon: 'عْ', maddAlif: 'عَا', maddWaw: 'عُو', maddYaa: 'عِي', initialForm: 'عَـ', medialForm: 'ـعَـ', finalForm: 'ـع', exampleWord: 'عُصْفُورٌ', emoji: '🐤', exampleSentence: 'عُصْفُورٌ صَغِيرٌ فَوْقَ الْغُصْنِ' },
  { id: 'ghayn', letter: 'غ', name: 'الْغَيْن', fatha: 'غَ', kasra: 'غِ', damma: 'غُ', sukoon: 'غْ', maddAlif: 'غَا', maddWaw: 'غُو', maddYaa: 'غِي', initialForm: 'غَـ', medialForm: 'ـغَـ', finalForm: 'ـغ', exampleWord: 'غَزَالٌ', emoji: '🦌', exampleSentence: 'غَزَالٌ رَشِيقٌ يَرْكُضُ' },
  { id: 'faa', letter: 'ف', name: 'الْفَاء', fatha: 'فَ', kasra: 'فِ', damma: 'فُ', sukoon: 'فْ', maddAlif: 'فَا', maddWaw: 'فُو', maddYaa: 'فِي', initialForm: 'فَـ', medialForm: 'ـفَـ', finalForm: 'ـف', exampleWord: 'فَرَاشَةٌ', emoji: '🦋', exampleSentence: 'فَرَاشَةٌ مُلَوَّنَةٌ جَمِيلَةٌ' },
  { id: 'qaf', letter: 'ق', name: 'الْقَاف', fatha: 'قَ', kasra: 'قِ', damma: 'قُ', sukoon: 'قْ', maddAlif: 'قَا', maddWaw: 'قُو', maddYaa: 'قِي', initialForm: 'قَـ', medialForm: 'ـقَـ', finalForm: 'ـق', exampleWord: 'قَمَرٌ', emoji: '🌙', exampleSentence: 'قَمَرٌ مُنِيرٌ فِي اللَّيْلِ' },
  { id: 'kaf', letter: 'ك', name: 'الْكَاف', fatha: 'كَ', kasra: 'كِ', damma: 'كُ', sukoon: 'كْ', maddAlif: 'كَا', maddWaw: 'كُو', maddYaa: 'كِي', initialForm: 'كَـ', medialForm: 'ـكَـ', finalForm: 'ـك', exampleWord: 'كِتَابٌ', emoji: '📖', exampleSentence: 'كِتَابٌ مُفِيدٌ أَقْرَأُ فِيهِ' },
  { id: 'lam', letter: 'ل', name: 'اللَّام', fatha: 'لَ', kasra: 'لِ', damma: 'لُ', sukoon: 'لْ', maddAlif: 'لَا', maddWaw: 'لُو', maddYaa: 'لِي', initialForm: 'لَـ', medialForm: 'ـلَـ', finalForm: 'ـل', exampleWord: 'لَيْمُونٌ', emoji: '🍋', exampleSentence: 'لَيْمُونٌ أَصْفَرُ مُنْعِشٌ' },
  { id: 'meem', letter: 'م', name: 'الْمِيم', fatha: 'مَ', kasra: 'مِ', damma: 'مُ', sukoon: 'مْ', maddAlif: 'مَا', maddWaw: 'مُو', maddYaa: 'مِي', initialForm: 'مَـ', medialForm: 'ـمَـ', finalForm: 'ـم', exampleWord: 'مَدْرَسَةٌ', emoji: '🏫', exampleSentence: 'مَدْرَسَتِي بَيْتُ الْعِلْمِ' },
  { id: 'noon', letter: 'ن', name: 'النُّون', fatha: 'نَ', kasra: 'نِ', damma: 'نُ', sukoon: 'نْ', maddAlif: 'نَا', maddWaw: 'نُو', maddYaa: 'نِي', initialForm: 'نَـ', medialForm: 'ـنَـ', finalForm: 'ـن', exampleWord: 'نَجْمَةٌ', emoji: '⭐', exampleSentence: 'نَجْمَةٌ ذَهَبِيَّةٌ لِلْمُجْتَهِدِ' },
  { id: 'haa2', letter: 'ه', name: 'الْهَاء', fatha: 'هَ', kasra: 'هِ', damma: 'هُ', sukoon: 'هْ', maddAlif: 'هَا', maddWaw: 'هُو', maddYaa: 'هِي', initialForm: 'هَـ', medialForm: 'ـهَـ', finalForm: 'ـه', exampleWord: 'هِلَالٌ', emoji: '🌙', exampleSentence: 'هِلَالٌ فِضِّيٌّ فِي السَّمَاءِ' },
  { id: 'waw', letter: 'و', name: 'الْوَاو', fatha: 'وَ', kasra: 'وِ', damma: 'وُ', sukoon: 'وْ', maddAlif: 'وَا', maddWaw: 'وُو', maddYaa: 'وِي', initialForm: 'وَ', medialForm: 'ـوَ', finalForm: 'ـو', exampleWord: 'وَرْدَةٌ', emoji: '🌹', exampleSentence: 'وَرْدَةٌ عَطِرَةُ الرَّائِحَةِ' },
  { id: 'yaa', letter: 'ي', name: 'الْيَاء', fatha: 'يَ', kasra: 'يِ', damma: 'يُ', sukoon: 'يْ', maddAlif: 'يَا', maddWaw: 'يُو', maddYaa: 'يِي', initialForm: 'يَـ', medialForm: 'ـيَـ', finalForm: 'ـي', exampleWord: 'يَدٌ', emoji: '✋', exampleSentence: 'يَدٌ نَظِيفَةٌ تَكْتُبُ الْوَاجِبَ' },
];

export interface SpellingWord {
  id: string;
  word: string;
  hint: string;
  pieces: string[];
  syllables: string[];
  level: 'سَهْلٌ' | 'مُتَوَسِّطٌ';
}

export const SPELLING_WORDS: SpellingWord[] = [
  {
    id: 'kataba',
    word: 'كَتَبَ',
    hint: 'فِعْلٌ يَدُلُّ عَلَى الْكِتَابَةِ بِالْقَلَمِ',
    pieces: ['كَ', 'تَ', 'بَ'],
    syllables: ['كَـ', 'ـتَـ', 'ـبَ'],
    level: 'سَهْلٌ',
  },
  {
    id: 'qalam',
    word: 'قَلَمٌ',
    hint: 'أَدَاةٌ نَكْتُبُ بِهَا فِي الدَّفْتَرِ',
    pieces: ['قَ', 'لَ', 'مٌ'],
    syllables: ['قَـ', 'ـلَـ', 'ـمٌ'],
    level: 'سَهْلٌ',
  },
  {
    id: 'qamar',
    word: 'قَمَرٌ',
    hint: 'جِسْمٌ مُضِيءٌ نَرَاهُ فِي السَّمَاءِ لَيْلًا',
    pieces: ['قَ', 'مَ', 'رٌ'],
    syllables: ['قَـ', 'ـمَـ', 'ـرٌ'],
    level: 'سَهْلٌ',
  },
  {
    id: 'shams',
    word: 'شَمْسٌ',
    hint: 'تُشْرِقُ فِي الصَّبَاحِ وَتَمْنَحُنَا الدِّفْءَ',
    pieces: ['شَ', 'مْ', 'سٌ'],
    syllables: ['شَمْـ', 'ـسٌ'],
    level: 'سَهْلٌ',
  },
  {
    id: 'bayt',
    word: 'بَيْتٌ',
    hint: 'الْمَكَانُ الَّذِي نَعِيشُ فِيهِ مَعَ أُسْرَتِنَا',
    pieces: ['بَ', 'يْ', 'تٌ'],
    syllables: ['بَيْـ', 'ـتٌ'],
    level: 'سَهْلٌ',
  },
  {
    id: 'kitab',
    word: 'كِتَابٌ',
    hint: 'نَقْرَأُ فِيهِ الْقِصَصَ وَالْعُلُومَ النَّافِعَةَ',
    pieces: ['كِ', 'تَا', 'بٌ'],
    syllables: ['كِـ', 'تَا', 'بٌ'],
    level: 'مُتَوَسِّطٌ',
  },
  {
    id: 'warda',
    word: 'وَرْدَةٌ',
    hint: 'زَهْرَةٌ جَمِيلَةٌ رَائِحَتُهَا ذَكِيَّةٌ',
    pieces: ['وَ', 'رْ', 'دَ', 'ةٌ'],
    syllables: ['وَرْ', 'دَ', 'ةٌ'],
    level: 'مُتَوَسِّطٌ',
  },
  {
    id: 'madrasa',
    word: 'مَدْرَسَةٌ',
    hint: 'الْمَكَانُ الَّذِي نَتَعَلَّمُ فِيهِ مَعَ أَصْدِقَائِنَا',
    pieces: ['مَ', 'دْ', 'رَ', 'سَ', 'ةٌ'],
    syllables: ['مَدْ', 'رَ', 'سَـ', 'ـةٌ'],
    level: 'مُتَوَسِّطٌ',
  },
];

export interface NounVerbItem {
  id: string;
  word: string;
  type: 'اسْمٌ' | 'فِعْلٌ';
  explanation: string;
}

export const NOUN_VERB_ITEMS: NounVerbItem[] = [
  { id: 'nv1', word: 'أَسَدٌ', type: 'اسْمٌ', explanation: 'تَدُلُّ عَلَى حَيَوَانٍ، وَيَقْبَلُ التَّنْوِينَ.' },
  { id: 'nv2', word: 'يَكْتُبُ', type: 'فِعْلٌ', explanation: 'تَدُلُّ عَلَى حَدَثِ الْكِتَابَةِ فِي الزَّمَنِ الْحَاضِرِ.' },
  { id: 'nv3', word: 'مَدْرَسَةٌ', type: 'اسْمٌ', explanation: 'تَدُلُّ عَلَى مَكَانٍ، وَفِيهَا تَاءٌ مَرْبُوطَةٌ.' },
  { id: 'nv4', word: 'قَرَأَ', type: 'فِعْلٌ', explanation: 'تَدُلُّ عَلَى عَمَلٍ حَدَثَ فِي الْمَاضِي.' },
  { id: 'nv5', word: 'شَجَرَةٌ', type: 'اسْمٌ', explanation: 'تَدُلُّ عَلَى نَبَاتٍ، وَفِيهَا تَاءٌ مَرْبُوطَةٌ.' },
  { id: 'nv6', word: 'يَلْعَبُ', type: 'فِعْلٌ', explanation: 'تَدُلُّ عَلَى حَرَكَةِ اللَّعِبِ وَالْمَرَحِ.' },
  { id: 'nv7', word: 'الْقَمَرُ', type: 'اسْمٌ', explanation: 'تَبْدَأُ بِـ (ال) التَّعْرِيفِ فَهِيَ اسْمٌ.' },
  { id: 'nv8', word: 'ارْسُمْ', type: 'فِعْلٌ', explanation: 'فِعْلُ أَمْرٍ يَطْلُبُ الرَّسْمَ.' },
];

export interface GenderPairItem {
  id: string;
  masculine: string;
  feminine: string;
  promptWord: string;
  targetType: 'مُذَكَّرٌ' | 'مُؤَنَّثٌ';
  options: string[];
  correctAnswer: string;
}

export const GENDER_ITEMS: GenderPairItem[] = [
  {
    id: 'g1',
    masculine: 'مُعَلِّمٌ',
    feminine: 'مُعَلِّمَةٌ',
    promptWord: 'مُعَلِّمٌ ← مَا الْمُؤَنَّثُ؟',
    targetType: 'مُؤَنَّثٌ',
    options: ['مُعَلِّمَةٌ', 'مُعَلِّمُونَ', 'قَلَمٌ'],
    correctAnswer: 'مُعَلِّمَةٌ',
  },
  {
    id: 'g2',
    masculine: 'طَالِبٌ',
    feminine: 'طَالِبَةٌ',
    promptWord: 'طَالِبٌ ← مَا الْمُؤَنَّثُ؟',
    targetType: 'مُؤَنَّثٌ',
    options: ['طَلَبٌ', 'طَالِبَةٌ', 'كِتَابٌ'],
    correctAnswer: 'طَالِبَةٌ',
  },
  {
    id: 'g3',
    masculine: 'وَلَدٌ',
    feminine: 'بِنْتٌ',
    promptWord: 'وَلَدٌ ← مَا الْمُؤَنَّثُ؟',
    targetType: 'مُؤَنَّثٌ',
    options: ['بِنْتٌ', 'أَخٌ', 'وَلَدَانِ'],
    correctAnswer: 'بِنْتٌ',
  },
  {
    id: 'g4',
    masculine: 'طَبِيبٌ',
    feminine: 'طَبِيبَةٌ',
    promptWord: 'طَبِيبَةٌ ← مَا الْمُذَكَّرُ؟',
    targetType: 'مُذَكَّرٌ',
    options: ['طَبِيبَاتٌ', 'طَبِيبٌ', 'مَرِيضَةٌ'],
    correctAnswer: 'طَبِيبٌ',
  },
  {
    id: 'g5',
    masculine: 'أَسَدٌ',
    feminine: 'لَبُؤَةٌ',
    promptWord: 'أَسَدٌ ← مَا الْمُؤَنَّثُ؟',
    targetType: 'مُؤَنَّثٌ',
    options: ['لَبُؤَةٌ', 'نَمِرٌ', 'غَزَالٌ'],
    correctAnswer: 'لَبُؤَةٌ',
  },
];

export interface DemonstrativeItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  correctPronoun: 'هَذَا' | 'هَذِهِ' | 'هَؤُلَاءِ';
  hint: string;
}

export const DEMONSTRATIVE_ITEMS: DemonstrativeItem[] = [
  { id: 'd1', sentenceBefore: '', sentenceAfter: 'قَلَمٌ جَدِيدٌ', correctPronoun: 'هَذَا', hint: 'مُفْرَدٌ مُذَكَّرٌ' },
  { id: 'd2', sentenceBefore: '', sentenceAfter: 'وَرْدَةٌ جَمِيلَةٌ', correctPronoun: 'هَذِهِ', hint: 'مُفْرَدٌ مُؤَنَّثٌ' },
  { id: 'd3', sentenceBefore: '', sentenceAfter: 'أَطْفَالٌ مُجْتَهِدُونَ', correctPronoun: 'هَؤُلَاءِ', hint: 'جَمْعٌ لِلْعَاقِلِ' },
  { id: 'd4', sentenceBefore: '', sentenceAfter: 'طَالِبٌ نَشِيطٌ', correctPronoun: 'هَذَا', hint: 'مُفْرَدٌ مُذَكَّرٌ' },
  { id: 'd5', sentenceBefore: '', sentenceAfter: 'مَدْرَسَتِي الْغَالِيَةُ', correctPronoun: 'هَذِهِ', hint: 'مُفْرَدٌ مُؤَنَّثٌ' },
  { id: 'd6', sentenceBefore: '', sentenceAfter: 'مُعَلِّمَاتٌ رَائِعَاتٌ', correctPronoun: 'هَؤُلَاءِ', hint: 'جَمْعٌ لِلْعَاقِلِ' },
];

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  readingLevel: string;
  pages: string[];
  question: string;
  options: string[];
  correctIndex: number;
}

export const SUPER_MIRA_STORIES: Story[] = [
  {
    id: 'garden',
    title: 'سُوبَر مِيرُو وَحَدِيقَةُ الْحُرُوفِ',
    subtitle: 'قِصَّةٌ عَنْ حُبِّ الْقِرَاءَةِ وَالتَّشْكِيلِ',
    image: '/src/assets/images/story_garden_letters_1795535662630.jpg',
    readingLevel: 'المستوى الأول · ٣ صفحات',
    pages: [
      'فِي صَبَاحٍ جَمِيلٍ، طَارَتْ سُوبَر مِيرُو إِلَى حَدِيقَةِ الْحُرُوفِ الْمُلَوَّنَةِ، حَيْثُ تَتَفَتَّحُ الْأَزْهَارُ مَعَ كُلِّ كَلِمَةٍ صَحِيحَةٍ يَقْرَؤُهَا الْأَطْفَالُ.',
      'وَجَدَتْ سُوبَر مِيرُو فَرَاشَةً صَغِيرَةً تَبْحَثُ عَنْ حَرْفِ الْبَاءِ وَالْفَتْحَةِ، فَسَاعَدَتْهَا فِي نُطْقِ (بَـ) ثُمَّ جَمَعَتْ مَعَهَا كَلِمَةَ (بَيْتٌ).',
      'فَرِحَتِ الْفَرَاشَةُ كَثِيراً وَطَارَتْ فَوْقَ الْكُتُبِ الْمَفْتُوحَةِ، وَتَعَلَّمَ الْجَمِيعُ أَنَّ الْقِرَاءَةَ تَفْتَحُ أَبْوَابَ الْمَعْرِفَةِ وَالسَّعَادَةِ.',
    ],
    question: 'مَا الْكَلِمَةُ الَّتِي جَمَعَتْهَا سُوبَر مِيرُو مَعَ الْفَرَاشَةِ؟',
    options: ['بَيْتٌ', 'قَمَرٌ', 'سَمَكَةٌ'],
    correctIndex: 0,
  },
  {
    id: 'pencil',
    title: 'الْقَلَمُ الشُّجَاعُ وَالدَّفْتَرُ النَّظِيفُ',
    subtitle: 'قِصَّةٌ عَنِ الإِتْقَانِ وَالْكِتَابَةِ الصَّحِيحَةِ',
    image: '/src/assets/images/story_brave_pencil_1795535661396.jpg',
    readingLevel: 'المستوى الثاني · ٣ صفحات',
    pages: [
      'كَانَ هُنَاكَ قَلَمٌ خَشَبِيٌّ صَغِيرٌ يَرْتَدِي وِشَاحاً أَزْرَقَ مِثْلَ سُوبَر مِيرُو، وَيَحْلُمُ أَنْ يَكْتُبَ أَجْمَلَ الْجُمَلِ الْعَرَبِيَّةِ.',
      'فِي كُلِّ يَوْمٍ، كَانَ الْقَلَمُ يَتَدَرَّبُ عَلَى رَسْمِ الْحُرُوفِ بِخَطٍّ وَاضِحٍ عَلَى السَّطْرِ، وَيَضَعُ النِّقَاطَ وَالْحَرَكَاتِ فِي مَكَانِهَا الصَّحِيحِ.',
      'وَفِي نِهَايَةِ الْأُسْبُوعِ، حَصَلَ الدَّفْتَرُ النَّظِيفُ عَلَى ثَلَاثِ نُجُومٍ ذَهَبِيَّةٍ، لِأَنَّ الْمُثَابَرَةَ تَصْنَعُ الْأَبْطَالَ الصِّغَارَ!',
    ],
    question: 'عَلَى كَمْ نَجْمَةً ذَهَبِيَّةً حَصَلَ الدَّفْتَرُ النَّظِيفُ؟',
    options: ['نَجْمَةٌ وَاحِدَةٌ', 'ثَلَاثُ نُجُومٍ', 'عَشْرُ نُجُومٍ'],
    correctIndex: 1,
  },
  {
    id: 'space',
    title: 'رِحْلَةٌ إِلَى كَوْكَبِ الْكَلِمَاتِ',
    subtitle: 'مُغَامَرَةٌ بَيْنَ النُّجُومِ وَأَسْمَاءِ الإِشَارَةِ',
    image: '/src/assets/images/story_planet_words_1795535662553.jpg',
    readingLevel: 'المستوى الثالث · ٣ صفحات',
    pages: [
      'رَكِبَتْ سُوبَر مِيرُو وَأَصْدِقَاؤُهَا الصَّارُوخَ الْأَزْرَقَ الذَّهَبِيَّ فِي رِحْلَةٍ مُشَوِّقَةٍ نَحْوَ كَوْكَبِ الْكَلِمَاتِ السَّعِيدَةِ.',
      'مَرُّوا بِالْقَمَرِ الْمُبْتَسِمِ فَقَالَتْ سُوبَر مِيرُو: هَذَا قَمَرٌ مُنِيرٌ! وَمَرُّوا بِنَجْمَةٍ لَامِعَةٍ فَقَالُوا: هَذِهِ نَجْمَةٌ ذَهَبِيَّةٌ!',
      'عِنْدَمَا عَادُوا إِلَى الْمَدْرَسَةِ، أَتْقَنَ كُلُّ طَالِبٍ التَّفْرِيقَ بَيْنَ (هَذَا) وَ(هَذِهِ)، وَاسْتَحَقَّ الجَمِيعُ وِسَامَ رُوَّادِ اللُّغَةِ.',
    ],
    question: 'مَا اسْمُ الإِشَارَةِ الَّذِي اسْتَخْدَمَتْهُ سُوبَر مِيرُو مَعَ كَلِمَةِ (نَجْمَةٌ)؟',
    options: ['هَذَا', 'هَذِهِ', 'هَؤُلَاءِ'],
    correctIndex: 1,
  },
];

export type QuizCategory = 'all' | 'letters' | 'spelling' | 'grammar';

export interface QuizQuestion {
  id: string;
  category: Exclude<QuizCategory, 'all'>;
  categoryLabel: string;
  question: string;
  highlight?: string;
  options: string[];
  correctIndex: number;
  praiseMessage: string;
}

export const QUIZ_BANK: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'letters',
    categoryLabel: 'الْحُرُوفُ وَالْحَرَكَاتُ',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي تَبْدَأُ بِحَرْفِ الْبَاءِ (ب):',
    options: ['بَيْتٌ', 'تُفَّاحٌ', 'قَمَرٌ', 'شَمْسٌ'],
    correctIndex: 0,
    praiseMessage: 'أَحْسَنْتَ يَا بَطَلُ! كَلِمَةُ (بَيْتٌ) تَبْدَأُ بِحَرْفِ الْبَاءِ.',
  },
  {
    id: 'q2',
    category: 'letters',
    categoryLabel: 'الْحُرُوفُ وَالْحَرَكَاتُ',
    question: 'أَيُّ حَرْفٍ يَحْمِلُ حَرَكَةَ الضَّمَّةِ؟',
    options: ['أَ', 'إِ', 'أُ', 'أْ'],
    correctIndex: 2,
    praiseMessage: 'مُمْتَازٌ يَا نَجْمُ! الضَّمَّةُ تَكُونُ فَوْقَ الْحَرْفِ (أُ).',
  },
  {
    id: 'q3',
    category: 'letters',
    categoryLabel: 'الْحُرُوفُ وَالْحَرَكَاتُ',
    question: 'بِأَيِّ حَرْفٍ تَبْدَأُ كَلِمَةُ (شَمْسٌ)؟',
    highlight: '☀️ شَمْسٌ',
    options: ['س', 'ص', 'ش', 'ث'],
    correctIndex: 2,
    praiseMessage: 'رَائِعٌ! تَبْدَأُ بِحَرْفِ الشِّينِ (شَ).',
  },
  {
    id: 'q4',
    category: 'letters',
    categoryLabel: 'الْحُرُوفُ وَالْحَرَكَاتُ',
    question: 'أَيْنَ تَقَعُ حَرَكَةُ الْكَسْرَةِ؟',
    options: ['تَحْتَ الْحَرْفِ', 'فَوْقَ الْحَرْفِ', 'فِي آخِرِ الْكَلِمَةِ', 'بَعْدَ الْمَدِّ'],
    correctIndex: 0,
    praiseMessage: 'ذَكِيٌّ جِدًّا! الْكَسْرَةُ دَائِماً تَحْتَ الْحَرْفِ مِثْلَ (إِ).',
  },
  {
    id: 'q5',
    category: 'letters',
    categoryLabel: 'الْحُرُوفُ وَالْحَرَكَاتُ',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي تَبْدَأُ بِحَرْفِ الْجِيمِ (ج):',
    options: ['حِصَانٌ', 'جَمَلٌ', 'خَرُوفٌ', 'دِيكٌ'],
    correctIndex: 1,
    praiseMessage: 'بَطَلٌ! كَلِمَةُ (جَمَلٌ) تَبْدَأُ بِحَرْفِ الْجِيمِ.',
  },
  {
    id: 'q6',
    category: 'spelling',
    categoryLabel: 'الْقِرَاءَةُ وَالتَّهْجِئَةُ',
    question: 'حَدِّدْ نَوْعَ الْمَدِّ فِي كَلِمَةِ (كِتَابٌ):',
    highlight: '📖 كِتَابٌ',
    options: ['مَدٌّ بِالْأَلِفِ', 'مَدٌّ بِالْوَاوِ', 'مَدٌّ بِالْيَاءِ', 'لَا يُوجَدُ مَدٌّ'],
    correctIndex: 0,
    praiseMessage: 'أَحْسَنْتَ! كَلِمَةُ (كِتَابٌ) فِيهَا مَدٌّ بِالْأَلِفِ.',
  },
  {
    id: 'q7',
    category: 'spelling',
    categoryLabel: 'الْقِرَاءَةُ وَالتَّهْجِئَةُ',
    question: 'حَدِّدْ نَوْعَ الْمَدِّ فِي كَلِمَةِ (عُصْفُورٌ):',
    highlight: '🐤 عُصْفُورٌ',
    options: ['مَدٌّ بِالْأَلِفِ', 'مَدٌّ بِالْوَاوِ', 'مَدٌّ بِالْيَاءِ', 'حَرَكَةٌ قَصِيرَةٌ'],
    correctIndex: 1,
    praiseMessage: 'مُمْتَازٌ! (عُصْفُورٌ) فِيهَا مَدٌّ طَوِيلٌ بِالْوَاوِ.',
  },
  {
    id: 'q8',
    category: 'spelling',
    categoryLabel: 'الْقِرَاءَةُ وَالتَّهْجِئَةُ',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي تَحْتَوِي عَلَى مَدٍّ بِالْيَاءِ:',
    options: ['حَقِيبَةٌ', 'قَمَرٌ', 'بَيْتٌ', 'أَسَدٌ'],
    correctIndex: 0,
    praiseMessage: 'رَائِعٌ! (حَقِيبَةٌ) فِيهَا مَدٌّ بِالْيَاءِ (قِيـ).',
  },
  {
    id: 'q9',
    category: 'spelling',
    categoryLabel: 'الْقِرَاءَةُ وَالتَّهْجِئَةُ',
    question: 'مَا الْكَلِمَةُ الصَّحِيحَةُ عِنْدَ تَرْكِيبِ الْحُرُوفِ: (قَـ + ـلَـ + ـمٌ)؟',
    highlight: 'قَـ  +  ـلَـ  +  ـمٌ',
    options: ['قَمَرٌ', 'قَلَمٌ', 'عَلَمٌ', 'كَلِمٌ'],
    correctIndex: 1,
    praiseMessage: 'عَبْقَرِيٌّ! رَكَّبْتَ كَلِمَةَ (قَلَمٌ) بِإِتْقَانٍ.',
  },
  {
    id: 'q10',
    category: 'spelling',
    categoryLabel: 'الْقِرَاءَةُ وَالتَّهْجِئَةُ',
    question: 'كَمْ مَقْطَعاً صَوْتِيًّا فِي كَلِمَةِ (كَـ / تَـ / بَ)؟',
    highlight: 'كَـ  /  تَـ  /  بَ',
    options: ['مَقْطَعَانِ', 'ثَلَاثَةُ مَقَاطِعَ', 'أَرْبَعَةُ مَقَاطِعَ', 'مَقْطَعٌ وَاحِدٌ'],
    correctIndex: 1,
    praiseMessage: 'بَطَلُ التَّهْجِئَةِ! ثَلَاثَةُ مَقَاطِعَ صَحِيحَةٌ.',
  },
  {
    id: 'q11',
    category: 'grammar',
    categoryLabel: 'الْقَوَاعِدُ النَّحْوِيَّةُ',
    question: 'اخْتَرِ اسْمَ الإِشَارَةِ الْمُنَاسِبَ: ( ....... زَهْرَةٌ جَمِيلَةٌ )',
    highlight: '🌸 ....... زَهْرَةٌ جَمِيلَةٌ',
    options: ['هَذَا', 'هَذِهِ', 'هَؤُلَاءِ', 'أَنْتَ'],
    correctIndex: 1,
    praiseMessage: 'أَحْسَنْتَ يَا فَارِسَ النَّحْوِ! هَذِهِ زَهْرَةٌ جَمِيلَةٌ.',
  },
  {
    id: 'q12',
    category: 'grammar',
    categoryLabel: 'الْقَوَاعِدُ النَّحْوِيَّةُ',
    question: 'اخْتَرِ اسْمَ الإِشَارَةِ الْمُنَاسِبَ: ( ....... قَلَمٌ أَزْرَقُ )',
    highlight: '✏️ ....... قَلَمٌ أَزْرَقُ',
    options: ['هَذَا', 'هَذِهِ', 'هَؤُلَاءِ', 'هِيَ'],
    correctIndex: 0,
    praiseMessage: 'مُمْتَازٌ! نَقُولُ (هَذَا قَلَمٌ) لِأَنَّهُ مُفْرَدٌ مُذَكَّرٌ.',
  },
  {
    id: 'q13',
    category: 'grammar',
    categoryLabel: 'الْقَوَاعِدُ النَّحْوِيَّةُ',
    question: 'مَا نَوْعُ كَلِمَةِ (يَكْتُبُ)؟',
    highlight: 'يَكْتُبُ',
    options: ['اسْمٌ', 'فِعْلٌ', 'حَرْفُ جَرٍّ', 'اسْمُ إِشَارَةٍ'],
    correctIndex: 1,
    praiseMessage: 'مُمْتَازٌ! (يَكْتُبُ) فِعْلٌ لِأَنَّهُ يَدُلُّ عَلَى عَمَلٍ.',
  },
  {
    id: 'q14',
    category: 'grammar',
    categoryLabel: 'الْقَوَاعِدُ النَّحْوِيَّةُ',
    question: 'أَيُّ كَلِمَةٍ تَدُلُّ عَلَى الْمُؤَنَّثِ؟',
    options: ['مُهَنْدِسٌ', 'تِلْمِيذَةٌ', 'أَسَدٌ', 'كِتَابٌ'],
    correctIndex: 1,
    praiseMessage: 'رَائِعٌ! (تِلْمِيذَةٌ) مُؤَنَّثٌ وَتَنْتَهِي بِالتَّاءِ الْمَرْبُوطَةِ.',
  },
  {
    id: 'q15',
    category: 'grammar',
    categoryLabel: 'الْقَوَاعِدُ النَّحْوِيَّةُ',
    question: 'أَيُّ كَلِمَةٍ مِمَّا يَلِي تُعَدُّ اسْماً؟',
    options: ['يَلْعَبُ', 'قَرَأَ', 'مَدْرَسَةٌ', 'ارْسُمْ'],
    correctIndex: 2,
    praiseMessage: 'أَحْسَنْتَ! (مَدْرَسَةٌ) اسْمُ مَكَانٍ وَتَنْتَهِي بِالتَّاءِ الْمَرْبُوطَةِ.',
  },
];

export interface BadgeInfo {
  id: string;
  title: string;
  requirementText: string;
  minStars: number;
}

export const ACHIEVEMENT_BADGES: BadgeInfo[] = [
  { id: 'starter', title: 'نَجْمُ الْبِدَايَةِ', requirementText: '٥ نُجُومٍ', minStars: 5 },
  { id: 'letters', title: 'مُسْتَكْشِفُ الْحُرُوفِ', requirementText: '١٥ نَجْمَةً', minStars: 15 },
  { id: 'reader', title: 'بَطَلُ التَّهْجِئَةِ', requirementText: '٣٠ نَجْمَةً', minStars: 30 },
  { id: 'grammar', title: 'فَارِسُ النَّحْوِ', requirementText: '٥٠ نَجْمَةً', minStars: 50 },
  { id: 'supermero', title: 'صَدِيقُ سُوبَر مِيرُو', requirementText: '٧٥ نَجْمَةً', minStars: 75 },
];
