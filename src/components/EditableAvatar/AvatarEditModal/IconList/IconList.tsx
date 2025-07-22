import React from 'react';

const icons = [
  {
    id: 1,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10411&avatarType=project'
  },
  {
    id: 2,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10400&avatarType=project'
  },
  {
    id: 3,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10401&avatarType=project'
  },
  {
    id: 4,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10402&avatarType=project'
  },
  {
    id: 5,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10403&avatarType=project'
  },
  {
    id: 6,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10404&avatarType=project'
  },
  {
    id: 7,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10405&avatarType=project'
  },
  {
    id: 8,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10406&avatarType=project'
  },
  {
    id: 9,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10407&avatarType=project'
  },
  {
    id: 10,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10408&avatarType=project'
  },
  {
    id: 11,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10409&avatarType=project'
  },
  {
    id: 12,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10410&avatarType=project'
  },
  {
    id: 13,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10415&avatarType=project'
  },
  {
    id: 14,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10412&avatarType=project'
  },
  {
    id: 15,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10413&avatarType=project'
  },
  {
    id: 16,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10414&avatarType=project'
  },
  {
    id: 17,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10416&avatarType=project'
  },
  {
    id: 18,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10417&avatarType=project'
  },
  {
    id: 19,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10418&avatarType=project'
  },
  {
    id: 20,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10419&avatarType=project'
  },
  {
    id: 21,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10420&avatarType=project'
  },
  {
    id: 22,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10421&avatarType=project'
  },
  {
    id: 23,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10422&avatarType=project'
  },
  {
    id: 24,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10423&avatarType=project'
  },
  {
    id: 25,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10424&avatarType=project'
  },
  {
    id: 26,
    photo:
      'https://010001.atlassian.net/secure/viewavatar?size=xxxlarge@2x&avatarId=10425&avatarType=project'
  }
];

interface IconListProps {
  startIndex?: number;
  endIndex?: number;
}

export default function IconList({ startIndex, endIndex }: IconListProps) {
  const visibleIcons = icons.slice(startIndex, endIndex);

  return (
    <>
      {visibleIcons.map((icon) => (
        <li key={icon.id}>
          <img src={icon.photo} alt="icon" />
        </li>
      ))}
    </>
  );
}
