import DescribeImage from '../../components/admin/results/types/DescribeImage'
import TypeWhatYouHear from '../../components/admin/results/types/TypeWhatYouHear'
import SelectTheMainIdea from '../../components/admin/results/types/SelectTheMainIdea'
import SelectTheBestTitle from '../../components/admin/results/types/SelectTheBestTitle'
import HighlightTheAnswer from '../../components/admin/results/types/HighlightTheAnswer'
import ListenAndSelectWords from '../../components/admin/results/types/ListenAndSelectWords'
import RespondInAtLeastWords from '../../components/admin/results/types/RespondInAtLeastWords'
import RecordSayingStatement from '../../components/admin/results/types/RecordSayingStatement'
import SelectRealEnglishWords from '../../components/admin/results/types/SelectRealEnglishWords'

export const ADMIN_QUESTION_COMPONENTS = {
   SELECT_REAL_ENGLISH_WORD: SelectRealEnglishWords,
   LISTEN_AND_SELECT_WORD: ListenAndSelectWords,
   TYPE_WHAT_YOU_HEAR: TypeWhatYouHear,
   DESCRIBE_IMAGE: DescribeImage,
   RECORD_SAYING: RecordSayingStatement,
   RESPOND_IN_AT_LEAST_N_WORDS: RespondInAtLeastWords,
   HIGHLIGHTS_THE_ANSWER: HighlightTheAnswer,
   SELECT_MAIN_IDEA: SelectTheMainIdea,
   SELECT_THE_BEST_TITLE: SelectTheBestTitle,
}
