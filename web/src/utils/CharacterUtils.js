import { CharacterConfig } from '../config/CharacterConfig';

export function hasValidJobIcon( character ) {
  const icon = character.icon.toLowerCase();
  const job = character.job.toLowerCase();

  if ( !icon || !job ) {
    return false;
  }

  if ( !CharacterConfig.VALID_JOBS[ icon ] ) {
    return false;
  }

  if ( !CharacterConfig.VALID_JOBS[ icon ].includes( job ) ) {
    return false;
  }

  return true;
}
