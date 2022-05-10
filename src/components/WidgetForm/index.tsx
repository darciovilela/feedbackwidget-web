import CloseButton from "../CloseButton"
import bugImageUrl from '../../images/bug.svg'
import ideaImageUrl from '../../images/idea.svg'
import thoughtImageUrl from '../../images/thought.svg'
import { useState } from "react"
import FeedbackTypeStep from "./Steps/FeedbackTypeStep"
import FeedbackContentStep from "./Steps/FeedbackContentStep"
import FeedbackSuccessStep from "./Steps/FeedbackSuccessStep"

export const feedbackTypes = {
    Bug: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'imagem de um inseto'
        },
    },

    Idea: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'imagem de uma lâmpada'
        },        
    },

    Other: {
        title: 'Outro',
        image: {
            source: thoughtImageUrl,
            alt: 'imagem de uma nuvem de pensamento'
        },
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

// renderiza a estrutura do widget completo quando o user clica no icone inicial
// useState vai anotar o valor inicial do feedbackType e depois usar a setFeedbackType para alterar o valor dele
function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)

    function handleRestartFeedback() {
        setFeedbackSent(false)
        setFeedbackType(null)
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded 2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            { feedbackSent ? (
                <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback}/>
                ) : (
                    <>
                    {!feedbackType ? (
                        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                    ) : (
                        <FeedbackContentStep 
                        feedbackType={feedbackType}
                        onFeedbackRestartRequested={handleRestartFeedback}
                        onFeedbackSent={() => setFeedbackSent(true)}
                        />
                    )}
                    </>
                
            )}

                 
            <footer className="text-xs text-neutral-400">
                Feito por <a className="underline underline-offset-1" href="https://github.com/darciovilela" target="_blank">Darcio Vilela</a>

            </footer>
        </div>
    )
}

export default WidgetForm