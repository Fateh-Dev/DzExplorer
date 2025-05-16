import React from 'react';
import { Star } from 'lucide-react'; 
import { TripComment } from './types';

interface Props {
  comments: TripComment[];
  isLoggedIn: boolean;
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  newRating: number;
  setNewRating: React.Dispatch<React.SetStateAction<number>>;
  submitting: boolean;
  handleCommentSubmit: () => void;
}

const TripComments: React.FC<Props> = ({
  comments,
  isLoggedIn,
  newComment,
  setNewComment,
  newRating,
  setNewRating,
  submitting,
  handleCommentSubmit,
}) => {
  return (
    <fieldset className="mt-6 border border-gray-300 rounded-md p-4">
      <legend className="text-xl font-semibold text-gray-800 px-2">Commentaires</legend>

      {isLoggedIn && (
        <div className="mb-4">
          <h4 className="text-lg font-medium text-gray-800 mb-2">Laisser un commentaire</h4>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            placeholder="Écrivez votre commentaire ici..."
            className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:border-cyan-500"
          />

          <div className="flex items-center gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setNewRating(star)}
                className={`cursor-pointer w-6 h-6 ${star <= newRating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill={star <= newRating ? 'currentColor' : 'none'}
              />
            ))}
          </div>

          <button
            onClick={handleCommentSubmit}
            disabled={submitting}
            className="mt-4 px-4 py-2 bg-cyan-900 text-white rounded-md hover:bg-cyan-800 disabled:opacity-50"
          >
            {submitting ? 'Envoi en cours...' : 'Envoyer'}
          </button>
        </div>
      )}

      {comments.length > 0 ? (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-md shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">
                  {comment.User?.username ?? 'Utilisateur'}
                </span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < comment.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.964c.3.92-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.785.57-1.838-.197-1.54-1.118l1.287-3.964a1 1 0 00-.364-1.118L2.045 9.39c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.963z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 whitespace-pre-line">{comment.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">Aucun commentaire pour le moment.</p>
      )}
    </fieldset>
  );
};

export default TripComments;
