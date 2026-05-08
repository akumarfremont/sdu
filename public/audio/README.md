# SDU audio assets

The app looks for these files here. All are optional — if missing, the
visuals still play, the audio just stays silent.

- `voiceover.mp3` — cold-open narration ("In the M&A justice system…"),
  ideally with the dun-dun sting concatenated at the end of the same file.
- `dun-dun.mp3` *(optional, fallback if not in the merged voiceover)*.
- `gavel.mp3` — short gavel hit, played at the start of the capstone case
  (Case 08, "The Helios-Lumina Deposition").

`.m4a` works too — the audio elements offer both `.mp3` and `.m4a` sources.

## Generating the voiceover

Use ElevenLabs (or any TTS with a deep, broadcast, masculine voice — "Adam",
"Stoneveil"). Script:

> "In the M&A justice system, the analysis is done by machines. But the
> judgment calls — the ones that close deals or sink them — are made by
> humans. These are their cases."

Target length: ~11 seconds. Then merge the dun-dun sting onto the end with
a short silence beat using https://audio-joiner.com or similar. The merged
file plays as a single continuous track in the cold open.

## Sourcing the dun-dun

Search Pixabay or Freesound for "law and order" / "dramatic sting". Trim to
~1 second.

## Sourcing the gavel

Search Pixabay or Freesound for "gavel hit" / "court gavel". Single short
strike, ~600ms. Save as `gavel.mp3`.
