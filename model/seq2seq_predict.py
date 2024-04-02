from __future__ import print_function

import pandas as pd
from seq2seq import Seq2SeqSummarizer
import numpy as np
import warnings
warnings.filterwarnings('ignore')


def main():
    np.random.seed(42)
    model_dir_path = './'

    # Adjust this line
    config = np.load(Seq2SeqSummarizer.get_config_file_path(model_dir_path=model_dir_path), allow_pickle=True).item()

    summarizer = Seq2SeqSummarizer(config)
    summarizer.load_weights(weight_file_path=Seq2SeqSummarizer.get_weight_file_path(model_dir_path=model_dir_path))
    content = "The White House on Wednesday declined to rule out that President Trump will issue a pardon to protect former national security adviser Michael Flynn from the Russia probe, as the investigation heats up and the administration weighs its strategy. White House Press Secretary Sarah Sanders said she is not aware of any plans to pardon Flynn, who has pleaded guilty to lying to the FBI about his contacts with Russia's ambassador to the U.S. But she did not rule out the possibility. 'I'm not aware of any plans for that at all,' Sanders said. 'I'm not aware of that, right now, so I can't answer that question right now at this time.' She added: 'I'm not aware of any conversations for that whatsoever.' The comments came after Trump tweeted earlier this month that he had to fire Flynn 'because he lied to the Vice President and the FBI.' Flynn's guilty plea has raised questions about whether Trump could try to pardon him, as a way to shield him from the investigation. Trump has denied any collusion with Russia, and has called the probe a 'witch hunt.'"
    print(summarizer.summarize(content))

if __name__ == '__main__':
    main()
