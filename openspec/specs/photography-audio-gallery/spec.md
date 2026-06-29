## ADDED Requirements

### Requirement: Photography gallery breaks the editorial grid
The photography section SHALL render as a `<section>` with `aria-label="Photography"` using a masonry or asymmetric full-bleed layout that intentionally exceeds the standard content-column width. Images SHALL be served via `next/image` with lazy loading and Cloudinary as the remote image source.

#### Scenario: Gallery images load lazily
- **WHEN** a user scrolls the photography section into view
- **THEN** images below the fold begin loading via native browser lazy loading, and a low-quality placeholder (blur) is shown until full resolution loads

#### Scenario: Gallery layout uses full viewport width
- **WHEN** the photography section renders on a desktop viewport
- **THEN** at least one image or image group spans the full viewport width (100vw), breaking outside the standard content column

#### Scenario: Images have descriptive alt text
- **WHEN** any gallery image renders
- **THEN** the `<img>` element has a non-empty `alt` attribute describing the photographic subject

### Requirement: Audio player integrates within the gallery section
A custom cinematic audio player SHALL be embedded within the photography section to play Bansuri flute tracks. The player SHALL accept a `tracks` array prop (each entry: `{ title: string; src: string; duration: string }`). The player SHALL support play/pause, track seek via progress bar, and volume control.

#### Scenario: Player starts in paused state
- **WHEN** the photography section mounts
- **THEN** the audio player is visible but in a paused state; no audio plays without explicit user interaction

#### Scenario: User can play and pause audio
- **WHEN** a user clicks the play button
- **THEN** audio begins playing and the button changes to a pause icon
- **WHEN** the user clicks the pause button
- **THEN** audio pauses and the button reverts to a play icon

#### Scenario: Progress bar updates during playback
- **WHEN** audio is playing
- **THEN** the progress bar advances in real time reflecting elapsed playback duration

#### Scenario: User can seek by clicking the progress bar
- **WHEN** a user clicks a position on the progress bar
- **THEN** audio playback jumps to the corresponding timestamp

#### Scenario: Volume control is functional
- **WHEN** a user adjusts the volume slider
- **THEN** audio output level changes accordingly, ranging from muted (0) to full (1.0)
