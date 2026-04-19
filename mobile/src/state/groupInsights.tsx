import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  SAMPLE_MEETUP_PROPOSAL,
  type MeetupProposal,
  type MeetupProposalActor,
} from '../mocks/ambient';

type GroupInsightsContextValue = {
  proposals: Record<string, MeetupProposal>;
  markProposed: (id: string, by: MeetupProposalActor) => void;
};

const GroupInsightsContext = createContext<GroupInsightsContextValue | null>(null);

const INITIAL_PROPOSALS: Record<string, MeetupProposal> = {
  [SAMPLE_MEETUP_PROPOSAL.id]: SAMPLE_MEETUP_PROPOSAL,
};

export function GroupInsightsProvider({ children }: { children: ReactNode }) {
  const [proposals, setProposals] = useState<Record<string, MeetupProposal>>(INITIAL_PROPOSALS);

  const markProposed = useCallback((id: string, by: MeetupProposalActor) => {
    setProposals((prev) => {
      const existing = prev[id];
      if (!existing || existing.status === 'proposed') return prev;
      return {
        ...prev,
        [id]: {
          ...existing,
          status: 'proposed',
          proposedBy: by,
          proposedAt: new Date().toISOString(),
        },
      };
    });
  }, []);

  const value = useMemo(() => ({ proposals, markProposed }), [proposals, markProposed]);
  return <GroupInsightsContext.Provider value={value}>{children}</GroupInsightsContext.Provider>;
}

export function useGroupInsights(): GroupInsightsContextValue {
  const ctx = useContext(GroupInsightsContext);
  if (!ctx) {
    throw new Error('useGroupInsights must be used within GroupInsightsProvider');
  }
  return ctx;
}
