'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, LogOut, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader, Reveal } from '@/components/MotionPrimitives';
import { TexturedImage } from '@/components/TexturedImage';
import { getProductBySlug } from '@/data/catalog';
import {
  useEnquiriesQuery,
  useShortlistQuery,
  useToggleShortlistMutation,
  useUpdateShortlistNoteMutation,
  useWithdrawEnquiryMutation,
} from '@/hooks/useCatalogQueries';
import { useAuth } from '@/providers/AuthProvider';

export function PartnerPortalClient() {
  const {
    user,
    profile,
    authReady,
    signingIn,
    signInWithGoogle,
    logout,
    updatePartnerProfile,
  } = useAuth();

  const { data: shortlist, isLoading: shortlistLoading } = useShortlistQuery(
    user?.uid,
    Boolean(user)
  );
  const { data: enquiries, isLoading: enquiriesLoading } = useEnquiriesQuery(
    user?.uid,
    Boolean(user)
  );
  const toggleShortlist = useToggleShortlistMutation(user?.uid);
  const updateNote = useUpdateShortlistNoteMutation(user?.uid);
  const withdrawEnquiry = useWithdrawEnquiryMutation(user?.uid);

  const [profileForm, setProfileForm] = useState({
    displayName: '',
    company: '',
    country: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});

  useEffect(() => {
    if (profile) {
      setProfileForm({
        displayName: profile.displayName || '',
        company: profile.company || '',
        country: profile.country || '',
      });
    }
  }, [profile]);

  useEffect(() => {
    if (shortlist) {
      setNoteDrafts((prev) => {
        const next = { ...prev };
        shortlist.forEach((item) => {
          if (next[item.productSlug] === undefined) {
            next[item.productSlug] = item.notes || '';
          }
        });
        return next;
      });
    }
  }, [shortlist]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      await updatePartnerProfile(profileForm);
      toast.success('Partner studio profile updated.');
    } catch {
      toast.error('Unable to update profile details.');
    } finally {
      setSavingProfile(false);
    }
  };

  return (
    <div data-testid="partner-portal-page">
      <PageHeader
        eyebrow="Partner Portal"
        title={[
          'Private label',
          <em key="w" className="text-gold-deep">
            workspace.
          </em>,
        ]}
        intro="Sign in with your Google business account to curate textile shortlists, attach specification notes, and track active manufacturing enquiries."
      />

      <section className="bg-cream pb-24 lg:pb-32">
        <div className="shell">
          {!authReady ? (
            <div className="py-16 text-center">
              <p className="animate-pulse font-serif text-2xl italic text-moss">
                Verifying partner session…
              </p>
            </div>
          ) : !user ? (
            <Reveal className="border border-forest/15 bg-sand p-10 sm:p-16">
              <div className="max-w-xl">
                <p className="eyebrow">Firebase Authentication</p>
                <h2 className="mt-4 font-serif text-3xl font-light text-forest sm:text-4xl">
                  Access your saved collections and studio briefs.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-moss sm:text-base">
                  Your shortlist items and manufacturing enquiries are isolated
                  to your verified account in Cloud Firestore.
                </p>
                <button
                  type="button"
                  data-testid="portal-google-signin-btn"
                  onClick={() => void signInWithGoogle()}
                  disabled={signingIn}
                  className="btn btn-forest mt-8"
                >
                  {signingIn ? 'Connecting…' : 'Continue with Google'}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </Reveal>
          ) : (
            <div className="space-y-20">
              <div className="flex flex-col justify-between gap-6 border-y border-forest/10 py-8 sm:flex-row sm:items-center">
                <div>
                  <p className="eyebrow">Signed In Partner</p>
                  <p className="mt-2 font-serif text-2xl text-forest sm:text-3xl">
                    {profile?.displayName || user.displayName}
                  </p>
                  <p className="mt-1 font-mono text-xs text-moss">
                    {user.email}
                  </p>
                </div>
                <button
                  type="button"
                  data-testid="portal-logout-btn"
                  onClick={() => void logout()}
                  className="btn btn-outline-forest self-start sm:self-auto"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>

              <div className="grid gap-14 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <Reveal className="bg-sand p-8">
                    <p className="eyebrow">Studio Profile</p>
                    <h2 className="mt-3 font-serif text-2xl text-forest">
                      Organisation Details
                    </h2>
                    <form
                      onSubmit={handleSaveProfile}
                      className="mt-8 space-y-6"
                    >
                      <div>
                        <label htmlFor="p-name" className="field-label">
                          Contact Name
                        </label>
                        <input
                          id="p-name"
                          required
                          minLength={1}
                          maxLength={120}
                          value={profileForm.displayName}
                          onChange={(e) =>
                            setProfileForm((p) => ({
                              ...p,
                              displayName: e.target.value,
                            }))
                          }
                          className="field-input"
                        />
                      </div>
                      <div>
                        <label htmlFor="p-company" className="field-label">
                          Brand / Hospitality Group
                        </label>
                        <input
                          id="p-company"
                          maxLength={120}
                          value={profileForm.company}
                          onChange={(e) =>
                            setProfileForm((p) => ({
                              ...p,
                              company: e.target.value,
                            }))
                          }
                          placeholder="e.g. Atelier Nord"
                          className="field-input"
                        />
                      </div>
                      <div>
                        <label htmlFor="p-country" className="field-label">
                          Destination Market
                        </label>
                        <input
                          id="p-country"
                          maxLength={80}
                          value={profileForm.country}
                          onChange={(e) =>
                            setProfileForm((p) => ({
                              ...p,
                              country: e.target.value,
                            }))
                          }
                          placeholder="e.g. United Kingdom"
                          className="field-input"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={savingProfile}
                        className="btn btn-forest w-full"
                      >
                        {savingProfile ? 'Saving…' : 'Save Studio Profile'}
                      </button>
                    </form>
                  </Reveal>
                </div>

                <div className="space-y-16 lg:col-span-8">
                  <div>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="eyebrow">Saved Pieces</p>
                        <h2 className="mt-2 font-serif text-3xl text-forest">
                          Textile Shortlist
                        </h2>
                      </div>
                      <Link href="/collections" className="link-underline">
                        Browse Catalogue
                      </Link>
                    </div>

                    {shortlistLoading ? (
                      <div className="mt-8 h-36 animate-pulse bg-sand" />
                    ) : !shortlist || shortlist.length === 0 ? (
                      <div className="mt-8 border border-forest/10 p-8 text-center">
                        <p className="font-serif text-2xl text-forest">
                          Your shortlist is empty.
                        </p>
                        <p className="mt-2 text-sm text-moss">
                          Open any piece in the catalogue to save it for private
                          label review.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-8 space-y-6">
                        {shortlist.map((item) => {
                          const product = getProductBySlug(item.productSlug);
                          return (
                            <div
                              key={item.productSlug}
                              className="flex flex-col gap-6 border border-forest/10 bg-white p-6 sm:flex-row"
                            >
                              {product && (
                                <Link
                                  href={`/collections/${item.productSlug}`}
                                  className="h-28 w-24 shrink-0 overflow-hidden bg-sand"
                                >
                                  <TexturedImage
                                    src={product.image}
                                    alt={item.productName}
                                    className="h-full w-full object-cover"
                                  />
                                </Link>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-4">
                                  <div>
                                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-deep">
                                      {item.category}
                                    </p>
                                    <Link
                                      href={`/collections/${item.productSlug}`}
                                      className="mt-1 block font-serif text-2xl text-forest hover:text-gold-deep"
                                    >
                                      {item.productName}
                                    </Link>
                                  </div>
                                  {product && (
                                    <button
                                      type="button"
                                      aria-label={`Remove ${item.productName}`}
                                      onClick={() =>
                                        void toggleShortlist.mutateAsync({
                                          product,
                                          isSaved: true,
                                        })
                                      }
                                      className="p-2 text-moss transition-colors hover:text-forest"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>

                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                                  <div className="flex-1">
                                    <label
                                      htmlFor={`note-${item.productSlug}`}
                                      className="field-label"
                                    >
                                      Customisation / Target Qty Notes
                                    </label>
                                    <input
                                      id={`note-${item.productSlug}`}
                                      maxLength={400}
                                      value={noteDrafts[item.productSlug] || ''}
                                      onChange={(e) =>
                                        setNoteDrafts((prev) => ({
                                          ...prev,
                                          [item.productSlug]: e.target.value,
                                        }))
                                      }
                                      placeholder="e.g. Match Pantone 7742C, MOQ 500 pcs"
                                      className="field-input"
                                    />
                                  </div>
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      await updateNote.mutateAsync({
                                        productSlug: item.productSlug,
                                        notes:
                                          noteDrafts[item.productSlug] || '',
                                      });
                                      toast.success('Specification note saved.');
                                    }}
                                    className="btn btn-outline-forest py-2.5 px-5"
                                  >
                                    Save Note
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="eyebrow">Submitted Briefs</p>
                        <h2 className="mt-2 font-serif text-3xl text-forest">
                          Manufacturing Enquiries
                        </h2>
                      </div>
                      <Link href="/contact" className="link-underline">
                        New Enquiry
                      </Link>
                    </div>

                    {enquiriesLoading ? (
                      <div className="mt-8 h-36 animate-pulse bg-sand" />
                    ) : !enquiries || enquiries.length === 0 ? (
                      <div className="mt-8 border border-forest/10 p-8 text-center">
                        <p className="font-serif text-2xl text-forest">
                          No enquiries submitted yet.
                        </p>
                        <p className="mt-2 text-sm text-moss">
                          Submit a collection brief from Contact to track it
                          here.
                        </p>
                      </div>
                    ) : (
                      <div className="mt-8 space-y-4">
                        {enquiries.map((enq) => (
                          <div
                            key={enq.id}
                            className="border border-forest/10 bg-white p-6"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-deep">
                                  {enq.category} &middot;{' '}
                                  {enq.status === 'submitted'
                                    ? 'Submitted to Studio'
                                    : 'Withdrawn'}
                                </p>
                                {enq.productName && (
                                  <p className="mt-1 font-serif text-xl text-forest">
                                    {enq.productName}
                                  </p>
                                )}
                              </div>
                              {enq.status === 'submitted' && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    await withdrawEnquiry.mutateAsync(enq.id);
                                    toast.success('Enquiry marked withdrawn.');
                                  }}
                                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-moss hover:text-forest"
                                >
                                  Withdraw
                                </button>
                              )}
                            </div>
                            <p className="mt-3 text-sm leading-relaxed text-moss">
                              {enq.message}
                            </p>
                            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                              {enq.company ? `${enq.company} · ` : ''}
                              {enq.country ? `${enq.country} · ` : ''}
                              {enq.createdAt
                                ? enq.createdAt.toLocaleDateString()
                                : 'Just now'}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
