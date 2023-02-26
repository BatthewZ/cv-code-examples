export const DownloadCharView: React.FC = () => {
  return (
    <div>
      <hr />
      <h2>There's a new way to download your character!</h2>
      <p>There is now an easier, faster way to download your character and get it into Grim Dawn ASAP.</p>
      <p>
        <strong>Follow these steps:</strong>
        <ol>
          <li>
            Download{' '}
            <a
              href='https://forums.crateentertainment.com/t/tool-gd-save-file-editor/35817'
              target='_blank'
              rel='noopener'
            >
              Odie's Save File Editor
            </a>{' '}
            (20 MB download)
          </li>
          <li>
            Run it, and type in: <code>make-char {'<your grimtools url>'}</code>
            <br />
            E.g. : <code>make-char https://www.grimtools.com/calc/wV11RqYV</code>
          </li>
          <li>Follow the prompts to name your char and set their level</li>
          <li>Log into the game to play your new character</li>
        </ol>
      </p>
      <p>
        <strong>It is that simple.</strong> Going forward, this will be much, much faster for you! Don't forget to thank
        him for adding this functionality to his tool. He worked hard on it! Show him some love. ^_^
      </p>
      <hr />
    </div>
  );
};
