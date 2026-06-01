import styled, { keyframes } from 'styled-components';

// ─── Animations ───────────────────────────────────────────────────────────────

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;


// ─── Layout ───────────────────────────────────────────────────────────────────

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 24px 80px;
  background-color: var(--bg);

`;

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  margin-bottom: 12px;
`;

export const Logo = styled.img<{ $spin?: boolean }>`
  height: 72px;
  filter: drop-shadow(0 0 18px var(--accent));
  animation: ${({ $spin }) => ($spin ? spin : 'none')} 12s linear infinite;

  @media (max-width: 1024px) {
    height: 52px;
  }
`;

export const LogoSeparator = styled.span`
  font-size: 28px;
  color: var(--border);
  font-weight: 300;
  user-select: none;
`;

export const Badge = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 99px;
  padding: 4px 14px;
  margin: 20px 0 20px 0;
`;

export const Title = styled.h1`
  margin: 0 0 12px;
`;

export const Subtitle = styled.p`
  font-size: 18px;
  max-width: 520px;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 56px;

  @media (max-width: 1024px) {
    font-size: 16px;
    margin-bottom: 40px;
  }
`;

// ─── Grid ─────────────────────────────────────────────────────────────────────

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 0 200px 48px 200px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  text-align: left;
  background: var(--code-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:hover {
    border-color: var(--accent-border);
    box-shadow: var(--shadow);
  }
`;

export const CardIcon = styled.div`
  font-size: 22px;
  margin-bottom: 10px;
`;

export const CardTitle = styled.h2`
  font-size: 16px !important;
  font-weight: 600;
  color: var(--text-h);
  margin: 0 0 6px !important;
`;

export const CardBody = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: var(--text);
`;

export const Tag = styled.code`
  font-size: 12px !important;
  padding: 2px 6px !important;
  margin-right: 4px;
`;

// ─── Notice box ───────────────────────────────────────────────────────────────

export const Notice = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  max-width: 780px;
  width: 100%;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 12px;
  padding: 20px 24px;
  text-align: left;
`;

export const NoticeIcon = styled.span`
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
`;

export const NoticeText = styled.p`
  font-size: 14px;
  line-height: 1.7;
  color: var(--text);

  code {
    font-size: 13px !important;
  }
`;