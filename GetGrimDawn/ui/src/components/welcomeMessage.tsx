export const WelcomeMsg: React.FC = () => {
  return (
    <div>
      <h2>Welcome!</h2>
      <p>
        This tool was developed so that players could quickly see the team benefits that their Grim Dawn character
        builds would provide for multiplayer gameplay. It was developed by one of the players from Deep SR multiplayer
        group{' '}
        <a
          href='https://forums.crateentertainment.com/t/1-1-9-1-updated-sr-186-knights-of-the-eternal-realm-healtank-builds-dps-build-insights/110302'
          target='_blank'
        >
          Knights of the Eternal Realm
        </a>
        .
      </p>
      <p>
        This buff calculator and character JSON downloader is offered freely, but{' '}
        <a href='https://www.buymeacoffee.com/wyrez' target='_blank'>
          if you would like to donate
        </a>{' '}
        to show your appreciation or to help cover server costs, please do so
        <a href='https://www.buymeacoffee.com/wyrez' target='_blank'>
          here
        </a>
        .
      </p>
    </div>
  );
};
